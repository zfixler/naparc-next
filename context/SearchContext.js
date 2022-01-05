//Library imports
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//Context
const Context = createContext();

function SearchContext({ children }) {
    const router = useRouter();
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [denominations, setDenominations] = useState({
		pca: true,
		opc: true,
		arp: true,
		urcna: true,
		hrc: true,
		prc: true,
		rpcna: true,
		frcna: true,
	});
	const [selectNone, setSelectNone] = useState(false);
	const [dis, setDis] = useState(25);
	const [loading, setLoading] = useState(false);
	const [suggestions, setSuggestions] = useState();
	const [results, setResults] = useState(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [error, setError] = useState(null);

	//Use effect for SelectAll/SelectNone value
	useEffect(() => {
		if (selectNone) {
			setDenominations({
				pca: false,
				opc: false,
				arp: false,
				urcna: false,
				hrc: false,
				prc: false,
				rpcna: false,
				frcna: false,
			});
		} else {
			setDenominations({
				pca: true,
				opc: true,
				arp: true,
				urcna: true,
				hrc: true,
				prc: true,
				rpcna: true,
				frcna: true,
			});
		}
	}, [selectNone]);

	//Use effect for page change
	useEffect(() => {
		if (router.query.pg && results !== null) {
			if (results.meta.pageCount > 1) {
				setCurrentPage(parseInt(router.query.pg - 1));
			} else {
				setCurrentPage(0);
			}
		}
	}, [router.query.pg]);

    //useEffect for URL reset
    useEffect(() => {
		if (router.asPath !== '/') {
			router.push('/');
		}
	}, []);

	//Functions for handling search inputs and submission to server
	async function handleSubmit(e, query) {
		e.preventDefault();
		setLoading(true);
		setCurrentPage(0);

		let body = (body = {
			body: {
				searchInput: null,
				pca: denominations.pca,
				opc: denominations.opc,
				rpcna: denominations.rpcna,
				urcna: denominations.urcna,
				prc: denominations.prc,
				hrc: denominations.hrc,
				frcna: denominations.frcna,
				arp: denominations.arp,
				dis: dis,
			},
		});

		if (query !== undefined) {
			body.body.searchInput = query;
		} else {
			body.body.searchInput = {
				long: suggestions.results[0].lon,
				lat: suggestions.results[0].lat,
			};
		}

		const res = await fetch('api/naparc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		if (res.status === 200) {
			const data = await res.json();

			if (data.meta.error === true) {
				setError(data.data.message);
				setLoading(false);
			} else {
				setResults(data);
				setSuggestions('');
				let url = `?pg=${currentPage + 1}`;
				router.push(url, undefined, { shallow: true });
				setLoading(false);
			}
		} else if (res.status === 500) {
			setError(
				'Whoops! The server encountered an error. Please try your search again.'
			);
			setLoading(false);
		} else {
			const data = await res.json();
			console.log(res.status, data);
			setLoading(false);
		}
	}

	function selectChange(e) {
		const { name, checked } = e.target;
		setDenominations((prevState) => {
			return {
				...prevState,
				[name]: checked,
			};
		});
	}

	async function handleInput(e) {
		setSearchInput(e.target.value);
		if (searchInput.length > 3) {
			setTimeout(() => {
				fetch(
					`https://api.geoapify.com/v1/geocode/autocomplete?text=${searchInput}&filter=countrycode:us,ca&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`
				)
					.then((res) => res.json())
					.then((data) => setSuggestions(data))
					.catch((error) => console.log(error));
			}, 300);
		}
	}

	return (
		<Context.Provider
			value={{
				isSettingsOpen,
				setIsSettingsOpen,
				searchInput,
				setSearchInput,
				denominations,
				setDenominations,
				selectNone,
				setSelectNone,
				dis,
				setDis,
				loading,
				setLoading,
				suggestions,
				setSuggestions,
				handleSubmit,
				selectChange,
				handleInput,
				results,
				setResults,
				currentPage,
				setCurrentPage,
				error,
				setError,
			}}>
			{children}
		</Context.Provider>
	);
}

export { SearchContext as SearchContextProvider, Context as SearchContext };

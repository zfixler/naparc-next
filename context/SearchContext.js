//Library imports
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//Context
const Context = createContext();

function SearchContext({ children }) {
	const router = useRouter();
	//Search state
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
	const [isInputFocused, setIsInputFocused] = useState(null);
	const [showSuggestions, setShowSuggestions] = useState(false);
	//state for active suggestions
	const [activeSuggestion, setActiveSuggestion] = useState(0);

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

	useEffect(() => {
		if (results !== null) {
			let url = `?pg=${currentPage + 1}`;
			router.push(url, undefined, { shallow: true });
		}
	}, [currentPage]);

	//useEffect for URL reset
	useEffect(() => {
		if (router.asPath !== '/') {
			router.push('/');
		}
	}, []);

	useEffect(() => {
		if (router.asPath === '/') {
			setSuggestions('');
			setSearchInput('');
			setResults(null);
			setCurrentPage(null);
		}
	}, [router.asPath]);

	//Functions for handling search inputs and submission to server
	//e comes from form submit via search button, query comes from suggestion selection
	//TODO: Correct submission so that it does not mismatch depending on how it is submitted
	async function handleSubmit(e, query) {
		e.preventDefault();
		setError(null);
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

		const regexUs = /\d{5}/;
		const regexCa = /[A-Z]\d[A-Z]/;

		if (query !== undefined) {
			//query taken from suggestion click
			body.body.searchInput = query;
			console.log(query)
		} else if (
			query === undefined &&
			suggestions.results !== undefined &&
			suggestions.results.length > 0
		) {
			//search input submits first suggestion
			body.body.searchInput = {
				long: suggestions.results[activeSuggestion].lon,
				lat: suggestions.results[activeSuggestion].lat,
			};
		} else if (
			(regexUs.test(searchInput) && searchInput.length === 5) ||
			(regexCa.test(searchInput) && searchInput.length === 3)
		) {
			body.body.searchInput = searchInput;
		} else {
			setError(
				'There was a problem with your search. Please try a different search.'
			);
			console.log(error);
			setLoading(false);
			return;
		}

		const res = await fetch('api/naparc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		console.log(res.status)
		if (res.status === 200) {
			const data = await res.json();
			console.log(data)
			if (data.meta.error === true) {
				setError(data.data.message);
				setLoading(false);
			} else {
				setResults(data);
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

	//function for handling denomination selection
	function selectChange(e) {
		const { name, checked } = e.target;
		setDenominations((prevState) => {
			return {
				...prevState,
				[name]: checked,
			};
		});
	}
	//function for handling input box change and hitting autocomplete api
	async function handleInput(e) {
		setSearchInput(e.target.value);

		if (e.target.value.length > 3) {
			if (currentTimeout) {
				clearTimeout(currentTimeout);
			}

			const currentTimeout = setTimeout(() => {
				let url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${e.target.value}&type=city&filter=countrycode:us,ca&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`;

				fetch(url)
					.then((res) => res.json())
					.then((data) => setSuggestions(data))
					.catch((error) => console.log(error));
			}, 300);
		}
	}

	//function for handling keyboard events
	function handleKeyDown(e) {
		if (suggestions.results !== undefined) {
			switch (e.key) {
				case 'Down':
					break;
				case 'ArrowDown':
					if (activeSuggestion < suggestions.results.length - 1) {
						setActiveSuggestion(activeSuggestion + 1);
					} else {
						setActiveSuggestion(0);
					}
					break;
				case 'Up':
					break;
				case 'ArrowUp':
					if (activeSuggestion > 0) {
						setActiveSuggestion(activeSuggestion - 1);
					} else {
						setActiveSuggestion(suggestions.results.length - 1);
					}
					break;
				case 'Esc':
					break;
				case 'Escape':
					break;
				case 'Enter':
					setSearchInput(suggestions.results[activeSuggestion].formatted);
					handleSubmit(e, {
						long: suggestions.results[activeSuggestion].lon,
						lat: suggestions.results[activeSuggestion].lat,
					});
				default:
					return;
			}
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
				isInputFocused,
				setIsInputFocused,
				showSuggestions,
				setShowSuggestions,
				handleKeyDown,
				activeSuggestion,
			}}>
			{children}
		</Context.Provider>
	);
}

export { SearchContext as SearchContextProvider, Context as SearchContext };

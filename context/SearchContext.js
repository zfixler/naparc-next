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
		rpcna: true,
		frcna: true,
		rcus: true,
	});
	const [selectNone, setSelectNone] = useState(false);
	const [dis, setDis] = useState(25);
	const [loading, setLoading] = useState(false);
	const [suggestions, setSuggestions] = useState(null);
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
				rpcna: false,
				frcna: false,
				rcus: false,
			});
		} else {
			setDenominations({
				pca: true,
				opc: true,
				arp: true,
				urcna: true,
				hrc: true,
				rpcna: true,
				frcna: true,
				rcus: true,
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
			setSearchInput('');
			setSuggestions(null);
			setResults(null);
			setCurrentPage(null);
		}
	}, [router.asPath]);

	//useEffect for setting error message on no results
	useEffect(() => {
		if (results !== null) {
			if (results.results.length === 0) {
				setError(
					"You're search did not yield any results. Please change your settings and try again."
				);
			}
		}
	}, [results]);

	//Functions for handling search inputs and submission to server
	//e comes from form submit via search button, query comes from suggestion selection
	//TODO: Correct submission so that it does not mismatch depending on how it is submitted
	async function handleSubmit(e, i) {
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
				hrc: denominations.hrc,
				frcna: denominations.frcna,
				arp: denominations.arp,
				rcus: denominations.rcus,
				dis: dis,
			},
		});

		const regexUs = /\d{5}/;
		const regexCa = /[A-Z]\d[A-Z]/;

		if (
			(regexUs.test(searchInput) && searchInput.length === 5) ||
			(regexCa.test(searchInput) && searchInput.length === 3)
		) {
			body.body.searchInput = searchInput;
		} else if (i !== null) {
			//index taken from suggestion click
			body.body.searchInput = {
				long: suggestions.results[i].lon,
				lat: suggestions.results[i].lat,
			};
			setSearchInput(suggestions.results[i].formatted);
		} else if (activeSuggestion) {
			//search input submits active suggestion from keyboard
			body.body.searchInput = {
				long: suggestions.results[activeSuggestion].lon,
				lat: suggestions.results[activeSuggestion].lat,
			};
			setSearchInput(suggestions.results[activeSuggestion].formatted);
		} else if (
			//search input submits first result
			activeSuggestion === null &&
			suggestions.results !== undefined &&
			suggestions.results.length > 0
		) {
			body.body.searchInput = {
				long: suggestions.results[0].lon,
				lat: suggestions.results[0].lat,
			};
			setSearchInput(suggestions.results[0].formatted);
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

		setShowSuggestions(false);

		if (res.status === 200) {
			const data = await res.json();

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
		const value = e.target.value;
		if (!value || value.length < 3) return;
		try {
			const response = await fetch('/api/autocomplete', {
				body: JSON.stringify({
					input: e.target.value,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});
			const data = await response.json();
			setSuggestions(data)
		} catch(error) {
			console.log(error);
		}
	}

	//function for handling keyboard events
	function handleKeyDown(e) {
		if (results && suggestions) {
			switch (e.key) {
				case 'Down':
					if (activeSuggestion < suggestions.results.length - 1) {
						setActiveSuggestion(activeSuggestion + 1);
					} else {
						setActiveSuggestion(0);
					}
					break;
				case 'ArrowDown':
					if (activeSuggestion < suggestions.results.length - 1) {
						setActiveSuggestion(activeSuggestion + 1);
					} else {
						setActiveSuggestion(0);
					}
					break;
				case 'Up':
					if (activeSuggestion > 0) {
						setActiveSuggestion(activeSuggestion - 1);
					} else {
						setActiveSuggestion(suggestions.results.length - 1);
					}
					break;
				case 'ArrowUp':
					if (activeSuggestion > 0) {
						setActiveSuggestion(activeSuggestion - 1);
					} else {
						setActiveSuggestion(suggestions.results.length - 1);
					}
					break;
				case 'Esc':
					setShowSuggestions(false);
					break;
				case 'Escape':
					setShowSuggestions(false);
					break;
				case 'Enter':
					handleSubmit(e, activeSuggestion);
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

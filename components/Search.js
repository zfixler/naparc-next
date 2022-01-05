import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
	SearchContainer,
	Form,
	SearchBar,
	InputWrapper,
	Button,
	SettingsPanel,
	DenominationSettings,
	Suggestions,
} from './styled/Search.styled';
import Checkbox from './Checkbox';
import Loading from './Loading';
import { SettingsIcon, SearchIcon, CloseIcon, Pin } from '../assets/icons';

function Search({ props }) {
	const router = useRouter();
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const { setResults, currentPage, setCurrentPage, setError } = props;
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
	const inputRef = useRef(null);
	const selectText = selectNone ? 'Select All' : 'Select None';

	async function handleSubmit(e, query) {
		e.preventDefault();
		setLoading(true);
		setCurrentPage(0);

		let body = body = {
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
		};

		if(query !== undefined){
			body.body.searchInput = query;
		} else {
			body.body.searchInput = {long: suggestions.results[0].lon, lat: suggestions.results[0].lat};
			
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
				setSuggestions('')
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

	useEffect(() => {
		if (router.asPath !== '/') {
			router.push('/');
		}
	}, []);

	//TODO: Fix issue with url change not being reflected in application state.

	useEffect(() => {
		if (router.query.pg) {
			if (router.query.pg !== currentPage) {
				let url = `?pg=${currentPage + 1}`;
				router.push(url, undefined, { shallow: true });
			}
		}
	}, [currentPage]);

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

	return (
		<SearchContainer>
			<Form onSubmit={(e) => handleSubmit(e)}>
				<SearchBar>
					<InputWrapper>
						<SearchIcon height="30" width="30" color="inherit" />
						<input
							ref={inputRef}
							type="search"
							name="searchInput"
							placeholder="Enter search location"
							value={searchInput}
							onChange={(e) => handleInput(e)}
						/>
						<SettingsIcon
							height="30"
							width="30"
							color="inherit"
							className="settingsIcon"
							onClick={() => setIsSettingsOpen(!isSettingsOpen)}
						/>
					</InputWrapper>
					<Button>Search</Button>
				</SearchBar>
				{suggestions && inputRef.current === document.activeElement && (
					<Suggestions role="tablist">
						{suggestions.results.map((s) => (
							<li role="tab">
								<button
									onClick={(e) => {
										setSearchInput(s.formatted);
										setSuggestions('');
										handleSubmit(e, { long: s.lon, lat: s.lat });
									}}>
									<Pin height="30" width="30" color="var(--blue)" />
									{s.formatted}
								</button>
							</li>
						))}
						<footer>
							Powered by <a href="https://www.geoapify.com/">Geoapify</a>
						</footer>
					</Suggestions>
				)}
				<SettingsPanel open={isSettingsOpen}>
					<CloseIcon
						height="15"
						width="15"
						color="var(--blue)"
						className="closeIcon"
						onClick={() => setIsSettingsOpen(!isSettingsOpen)}
					/>
					<div
						className="backgroundDiv"
						onClick={(e) => {
							e.preventDefault();
							if (e.target === e.currentTarget) {
								setIsSettingsOpen(false);
							}
						}}></div>
					<DenominationSettings>
						<subtitle className="settingsTitle">Denominations</subtitle>
						<Checkbox
							name={'opc'}
							select={selectChange}
							denominations={denominations}
						/>
						<Checkbox
							name={'pca'}
							select={selectChange}
							denominations={denominations}
						/>
						<Checkbox
							name={'rpcna'}
							select={selectChange}
							denominations={denominations}
						/>
						<Checkbox
							name={'arp'}
							select={selectChange}
							denominations={denominations}
						/>
						<Checkbox
							name={'urcna'}
							select={selectChange}
							denominations={denominations}
						/>
						<Checkbox
							name={'hrc'}
							select={selectChange}
							denominations={denominations}
						/>
						<Checkbox
							name={'prc'}
							select={selectChange}
							denominations={denominations}
						/>
						<p onClick={() => setSelectNone(!selectNone)}>{selectText}</p>
					</DenominationSettings>

					<label htmlFor="dis" className="settingsTitle">
						Search Radius <br />
						<select
							name="dis"
							value={dis}
							onChange={(e) => setDis(e.target.value)}>
							<option value="10">10 miles</option>
							<option value="25">25 miles</option>
							<option value="50">50 miles</option>
							<option value="75">75 miles</option>
							<option value="100">100 miles</option>
						</select>
					</label>
				</SettingsPanel>
			</Form>
			{loading && <Loading />}
		</SearchContainer>
	);
}

export default Search;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	SearchContainer,
	Form,
	SearchBar,
	InputWrapper,
	Button,
	SettingsPanel,
	DenominationSettings,
} from './styled/Search.styled';
import Checkbox from './Checkbox';
import Loading from './Loading';
import { SettingsIcon, SearchIcon, CloseIcon } from '../assets/icons';

function Search({ props }) {
	const router = useRouter();
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const { setResults, currentPage, setCurrentPage } = props;
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

	const selectText = selectNone ? 'Select All' : 'Select None';

	async function handleSubmit(e, urlParams) {
		if(e){
			e.preventDefault();
		}

		setLoading(true);
		setCurrentPage(0);

		let body = null;

		if(urlParams){
			body = JSON.stringify({body: urlParams});
			console.log(body)
		} else {
			body = JSON.stringify({
				body: {
					searchInput: searchInput,
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
			})

			console.log(body)
		}

		const res = await fetch('api/naparc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: body
		});

		const data = await res.json()
		setResults(data);

		let url = `?searchInput=${searchInput}&urcna=${denominations.urcna}&opc=${denominations.opc}&pca=${denominations.pca}&rpcna=${denominations.rpcna}&hrc=${denominations.hrc}&prc=${denominations.prc}&arp=${denominations.arp}&frcna=${denominations.frcna}&dis=${dis}&pg=${currentPage + 1}`;

		router.push(url, undefined, { shallow: true });
		setLoading(false);
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

	useEffect(() => {
		if(router.asPath !== '/'){
			const url = new URL(window.location.href);
			if(url.searchParams.get("searchInput") !== ""){
				const urlParams = {
					searchInput: url.searchParams.get("searchInput"),
					pca: url.searchParams.get("pca"),
					opc: url.searchParams.get("opc"),
					rpcna: url.searchParams.get("rpcna"),
					urcna: url.searchParams.get("urcna"),
					prc: url.searchParams.get("prc"),
					hrc: url.searchParams.get("hrc"),
					frcna: url.searchParams.get("frcna"),
					arp: url.searchParams.get("arp"),
					dis: url.searchParams.get("dis"),
				}
				handleSubmit(null, urlParams)
			} else {
				router.push('/')
			}
		}
	}, [])

	//TODO: Fix issue with url change not being reflected in application state.

	useEffect(() => {
		if (router.query.pg) {
			if(router.query.pg !== currentPage){
				let url = `?searchInput=${searchInput}&urcna=${denominations.urcna}&opc=${denominations.opc}&pca=${denominations.pca}&rpcna=${denominations.rpcna}&hrc=${denominations.hrc}&prc=${denominations.prc}&arp=${denominations.arp}&frcna=${denominations.frcna}&dis=${dis}&pg=${currentPage + 1}`;
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
						<SearchIcon height="20" width="20" color="inherit" />
						<input
							type="search"
							name="searchInput"
							placeholder="Enter search location"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
						<SettingsIcon
							height="20"
							width="20"
							color="inherit"
							className="settingsIcon"
							onClick={() => setIsSettingsOpen(!isSettingsOpen)}
						/>
					</InputWrapper>
					<Button>Search</Button>
				</SearchBar>
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

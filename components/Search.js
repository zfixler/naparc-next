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
	Suggestions
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
	const [suggestions, setSuggestions] = useState({"results":[{"datasource":{"sourcename":"openstreetmap","attribution":"© OpenStreetMap contributors","license":"Open Database License","url":"https://www.openstreetmap.org/copyright"},"city":"Grove","county":"Delaware County","state":"Oklahoma","postcode":"07344","country":"United States","country_code":"us","village":"Grove","lon":-94.7691186,"lat":36.5936863,"state_code":"OK","formatted":"Grove, OK 07344, United States of America","address_line1":"Grove, OK 07344","address_line2":"United States of America","category":"administrative","result_type":"postcode","rank":{"importance":0.37707300990936143,"confidence":1,"confidence_city_level":1,"match_type":"full_match"},"place_id":"51b36f383d39b157c059a84aa5e9fd4b4240f00101f901b3d2020000000000c00207"},{"datasource":{"sourcename":"openstreetmap","attribution":"© OpenStreetMap contributors","license":"Open Database License","url":"https://www.openstreetmap.org/copyright"},"county":"Cane Grove","state":"Demerara-Mahaica","country":"Guyana","country_code":"gy","lon":-57.92932991389755,"lat":6.6368006,"state_code":"DE","name":"Cane Grove","formatted":"Cane Grove, Guyana","address_line1":"Cane Grove","address_line2":"Guyana","category":"administrative","result_type":"county","rank":{"importance":0.45,"confidence":1,"match_type":"full_match"},"place_id":"5136b15948f4f64cc059ef4adc74158c1a40f00101f901b75fab0000000000c0020992030a43616e652047726f7665"},{"datasource":{"sourcename":"openstreetmap","attribution":"© OpenStreetMap contributors","license":"Open Database License","url":"https://www.openstreetmap.org/copyright"},"county":"Haslington - Grove","state":"Demerara-Mahaica","country":"Guyana","country_code":"gy","lon":-57.96926081685096,"lat":6.703109100000001,"state_code":"DE","name":"Haslington - Grove","formatted":"Haslington - Grove, Guyana","address_line1":"Haslington - Grove","address_line2":"Guyana","category":"administrative","result_type":"county","rank":{"importance":0.45,"confidence":1,"match_type":"full_match"},"place_id":"51a6d50abd10fc4cc0597a14f8d4fbcf1a40f00101f901295fab0000000000c002099203124861736c696e67746f6e202d2047726f7665"},{"datasource":{"sourcename":"openstreetmap","attribution":"© OpenStreetMap contributors","license":"Open Database License","url":"https://www.openstreetmap.org/copyright"},"county":"North Grove","state":"Saskatchewan","country":"Canada","country_code":"ca","lon":-105.55758698881368,"lat":50.696875000000006,"state_code":"SK","name":"North Grove","formatted":"North Grove, SK, Canada","address_line1":"North Grove, SK","address_line2":"Canada","category":"administrative","result_type":"county","rank":{"importance":0.45,"confidence":1,"match_type":"full_match"},"place_id":"5150685681af635ac0593433333333594940f00101f9013eb7b50000000000c0020992030b4e6f7274682047726f7665"},{"datasource":{"sourcename":"openstreetmap","attribution":"© OpenStreetMap contributors","license":"Open Database License","url":"https://www.openstreetmap.org/copyright"},"city":"City of Spruce Grove","state":"Alberta","country":"Canada","country_code":"ca","lon":-113.903503,"lat":53.545204,"state_code":"AB","formatted":"City of Spruce Grove, AB, Canada","address_line1":"City of Spruce Grove, AB","address_line2":"Canada","category":"administrative","result_type":"city","rank":{"importance":0.46237775370916623,"confidence":1,"confidence_city_level":1,"match_type":"full_match"},"place_id":"51a0353ffed2795cc059fed2a23ec9c54a40f00101f901fe943f0000000000c00208"}]})

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

		}

		const res = await fetch('api/naparc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: body
		});

		if (res.status === 200){
			const data = await res.json()

			if (data.meta.error === true){
				setError(data.data.message)
				setLoading(false)
			} else {
				setResults(data);
				console.log(data)
				let url = `?searchInput=${searchInput}&urcna=${denominations.urcna}&opc=${denominations.opc}&pca=${denominations.pca}&rpcna=${denominations.rpcna}&hrc=${denominations.hrc}&prc=${denominations.prc}&arp=${denominations.arp}&frcna=${denominations.frcna}&dis=${dis}&pg=${currentPage + 1}`;
		
				router.push(url, undefined, { shallow: true });
				setLoading(false);
			}
		} else if (res.status === 500){
			setError('Whoops! The server encountered an error. Please try your search again.');
			setLoading(false);
		} else {
			const data = await res.json()
			console.log(res.status, data)
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
						<SearchIcon height="30" width="30" color="inherit" />
						<input
							type="search"
							name="searchInput"
							placeholder="Enter search location"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
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
						{suggestions && <Suggestions>{suggestions.results.map(s => <p><Pin height="40" width="40" color="var(--blue)" />{s.formatted}</p>)}</Suggestions>}
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

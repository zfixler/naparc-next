import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	SearchContainer,
	Form,
	SearchBar,
	InputWrapper,
	Button,
	SettingsPanel
} from './styled/Search.styled';
import { SettingsIcon, SearchIcon } from '../assets/icons';

function Search({ props }) {
	const router = useRouter();
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)
	const { setResults } = props;
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
	const [dis, setDis] = useState(25);

	async function handleSubmit() {
		const res = await fetch('api/naparc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ body: router.query }),
		});

		setResults(await res.json());
		setDenominations({
			pca: router.query.pca === 'on' ? true : false,
			opc: router.query.opc === 'on' ? true : false,
			arp: router.query.arp === 'on' ? true : false,
			urcna: router.query.arp === 'on' ? true : false,
			hrc: router.query.hrc === 'on' ? true : false,
			prc: router.query.prc === 'on' ? true : false,
			rpcna: router.query.rpcna === 'on' ? true : false,
			frcna: router.query.frcna === 'on' ? true : false,
		});
		setDis(router.query.dis);
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
		if (router.query.searchInput) {
			handleSubmit();
		}
	}, [router.query]);

	return (
		<SearchContainer>
			<Form>
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
						<SettingsIcon height="20" width="20" color="inherit" onClick={() => setIsSettingsOpen(!isSettingsOpen)}/>
					</InputWrapper>
					<Button>Search</Button>
				</SearchBar>
				<SettingsPanel open={isSettingsOpen}>
					<input
						type="checkbox"
						name="pca"
						checked={denominations.pca}
						onChange={(e) => selectChange(e)}
					/>
					<label htmlFor="pca">PCA</label>
					<input
						type="checkbox"
						name="opc"
						checked={denominations.opc}
						onChange={(e) => selectChange(e)}
					/>
					<label htmlFor="opc">OPC</label>
					<input
						type="checkbox"
						name="arp"
						checked={denominations.arp}
						onChange={(e) => selectChange(e)}
					/>
					<label htmlFor="arp">ARP</label>
					<input
						type="checkbox"
						name="rpcna"
						checked={denominations.rpcna}
						onChange={(e) => selectChange(e)}
					/>
					<label htmlFor="rpcna">RPCNA</label>
					<input
						type="checkbox"
						name="urcna"
						checked={denominations.urcna}
						onChange={(e) => selectChange(e)}
					/>
					<label htmlFor="urcna">URCNA</label>
					<input
						type="checkbox"
						name="prc"
						checked={denominations.prc}
						onChange={(e) => selectChange(e)}
					/>
					<label htmlFor="prc">PRC</label>
					<input
						type="checkbox"
						name="hrc"
						checked={denominations.hrc}
						onChange={(e) => selectChange(e)}
					/>
					<label htmlFor="hrc">HRC</label>
					<input
						type="checkbox"
						name="frcna"
						checked={denominations.frcna}
						onChange={(e) => selectChange(e)}
					/>
					<label htmlFor="frcna">FRCNA</label>
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
				</SettingsPanel>
			</Form>
		</SearchContainer>
	);
}

export default Search;

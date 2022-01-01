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
	const [selectNone, setSelectNone] = useState(false);
	const [dis, setDis] = useState(25);
	const [loading, setLoading] = useState(false)

	const selectText = selectNone ? 'Select All' : 'Select None';

	async function handleSubmit() {
		setLoading(true)
		const res = await fetch('api/naparc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ body: router.query }),
		});

		setResults(await res.json());
		setLoading(false)
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

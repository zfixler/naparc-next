//Library imports
import { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
//Context import
import { SearchContext } from '../context/SearchContext';
//Component imports
import Checkbox from './Checkbox';
import Loading from './Loading';
//Styled Components
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
//Icons
import { SettingsIcon, SearchIcon, CloseIcon, Pin } from './icons';

//Component for handling search input and settings
function Search() {
	const router = useRouter();
	//Search state from context
	const {
		isSettingsOpen,
		setIsSettingsOpen,
		searchInput,
		setSearchInput,
		denominations,
		selectNone,
		setSelectNone,
		dis,
		setDis,
		loading,
		suggestions,
		setSuggestions,
		handleSubmit,
		selectChange,
		handleInput
	} = useContext(SearchContext);

	//Refs
	const inputRef = useRef(null);
	const selectText = selectNone ? 'Select All' : 'Select None';

	//TODO: Fix issue with url change not being reflected in application state.

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

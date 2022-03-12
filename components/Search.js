//Library imports
import { useRef, useContext, useState, useEffect } from 'react';
//Context import
import { SearchContext } from '../context/SearchContext';
//Component imports
import Checkbox from './Checkbox';
import Loading from './Loading';
import Suggestions from './Suggestions';
//Styled Components
import {
	SearchContainer,
	Form,
	SearchBar,
	InputWrapper,
	Button,
	SettingsPanel,
	DenominationSettings,
	OtherSettings,
} from './styled/Search.styled';
//Icons
import { SettingsIcon, SearchIcon, CloseIcon } from './icons';

//Component for handling search input and settings
function Search() {
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
		handleSubmit,
		selectChange,
		handleInput,
		showSuggestions,
		setShowSuggestions,
		error,
		setError,
		handleKeyDown,
		activeSuggestion,
	} = useContext(SearchContext);

	const [inputFocus, setInputFocus] = useState(false);

	//Refs
	const inputRef = useRef(null);
	const settingsRef = useRef(null);

	const selectText = selectNone ? 'Select All' : 'Select None';

	//Initiate input focus on mount
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	//Always show suggestions when input focused
	useEffect(() => {
		if (inputRef.current === document.activeElement) {
			setShowSuggestions(true);
		}
	}, [setShowSuggestions]);

	return (
		<SearchContainer>
			<Form onSubmit={(e) => handleSubmit(e, activeSuggestion)}>
				<SearchBar>
					<InputWrapper>
						<SearchIcon
							height="30"
							width="30"
							color={inputFocus ? 'var(--blue)' : '#828282'}
						/>
						<input
							onKeyDown={(e) => handleKeyDown(e)}
							ref={inputRef}
							type="search"
							name="searchInput"
							placeholder="Enter search location"
							autoComplete="off"
							value={searchInput}
							onChange={(e) => handleInput(e)}
							onFocus={() => {
								setShowSuggestions(true);
								setInputFocus(!inputFocus);
							}}
							onBlur={() => setInputFocus(!inputFocus)}
						/>
						<SettingsIcon
							height="30"
							width="30"
							color={isSettingsOpen ? 'var(--blue)' : '#828282'}
							className="settingsIcon"
							onClick={() => setIsSettingsOpen(!isSettingsOpen)}
						/>
					</InputWrapper>
					<Button>Search</Button>
					{error && <div className="error">{error}</div>}
				</SearchBar>
				{suggestions && showSuggestions && (
					<Suggestions
						role="tablist"
						props={{
							suggestions,
							handleSubmit,
							setSearchInput,
							setShowSuggestions,
							inputRef,
							setError,
							activeSuggestion,
						}}
					/>
				)}
				<SettingsPanel ref={settingsRef} open={isSettingsOpen}>
					<CloseIcon
						height="25"
						width="25"
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
						<h4 className="settingsTitle">Denominations</h4>
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
						<p onClick={() => setSelectNone(!selectNone)}>{selectText}</p>
					</DenominationSettings>
					<OtherSettings>
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
						<Button
							onClick={(e) => {
								e.preventDefault()
								if (suggestions) {
									setIsSettingsOpen(!isSettingsOpen);
									handleSubmit(e, activeSuggestion);
								} else {
									setIsSettingsOpen(!isSettingsOpen);
								}
							}}>
							Save
						</Button>
					</OtherSettings>
				</SettingsPanel>
			</Form>
			{loading && <Loading />}
		</SearchContainer>
	);
}

export default Search;

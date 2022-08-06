import styled from 'styled-components';

export const SearchContainer = styled.div`
	margin-bottom: 2em;
	align-self: center;
	justify-self: flex-start;

	.settingsIcon {
		cursor: pointer;
	}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1em;
	position: relative;
`;

export const SearchBar = styled.div`
	position: relative;
	display: flex;
	gap: 0.5em;
`;

export const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 0.25em 0.5em;
	background-color: var(--white);
	border-radius: 8px;
	box-shadow: var(--box-shadow);
	position: relative;

	input {
		border: none;
		padding: 0.5em 1em;
		background-color: var(--white);
		font-size: 1.1rem;
		max-width: 47vw;
		-webkit-appearance: textfield;

		&::-webkit-search-decoration {
			-webkit-appearance: none;
		}
	}

	input:focus {
		outline: none;
	}
`;

export const Button = styled.button`
	font-size: 1.1rem;
	padding: 0.25em 0.5em;
	margin: 0;
	background-color: var(--blue);
	color: var(--white);
	border: none;
	border-radius: 8px;
	box-shadow: var(--box-shadow);
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover,
	:focus {
		background-color: var(--white);
		color: black;
	}
`;

export const SettingsPanel = styled.aside`
	box-sizing: border-box;
	position: absolute;
	top: 3.5em;
	width: 100%;
	background-color: var(--white);
	padding: 2em;
	display: ${({ open }) => (open ? 'flex' : 'none')};
	justify-content: space-between;
	gap: 0.5em;
	border-radius: 8px;
	box-shadow: var(--box-shadow);
	z-index: 500;

	.settingsTitle {
		color: var(--blue);
		font-weight: bold;
		padding-bottom: 0.5em;
		font-size: var(--fs-h5);
	}

	p {
		text-decoration: underline;
		margin-top: 0.5em;
		cursor: pointer;
	}

	.backgroundDiv {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
	}

	.closeIcon {
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
	}

	@media (max-width: 40em) {
		top: -10em;
	}
`;

export const DenominationSettings = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const OtherSettings = styled.div`

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

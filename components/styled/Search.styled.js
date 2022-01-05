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
	display: flex;
`;

export const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 0.25em 0.5em;
	background-color: var(--white);
	border-radius: 8px;
	box-shadow: var(--box-shadow);
	max-width: 100%;
	position: relative;

	input {
		border: none;
		padding: 0.5em 1em;
		background-color: var(--white);
		font-size: 1.1rem;
		max-width: 100%;
	}

	input:focus {
		outline: none;
	}
`;

export const Suggestions = styled.ul`
	position: absolute;
	background-color: var(--white);
	box-shadow: var(--box-shadow);
	border-radius: 8px;
	top: 3.5em;
	width: 98%;
    z-index: 100;

	li {
        list-style-type: none;
	}

    button {
            border: none;
            background-color: inherit;
            font-size: inherit;
            padding: 0.25em 0.5em;
            text-align: start;
            display: flex;
            align-items: center;
            margin: 0;
            cursor: pointer;
            gap: .5em;
            width: 100%;
    
            &:first-of-type {
                padding-top: .25em;
    
                &:hover,  &:focus-visible{
                    border-radius: 8px 8px 0 0;
                }
            }
    
            &:last-of-type {
                padding-bottom: .25em;
            }
    
            &:hover,
            &:focus-visible {
                background-color: #d9dbff;
                color: #3f51b5;
            }
        }

    footer {
        font-size: var(--fs-small);
        margin: .25em 0;
    }
`;

export const Button = styled.button`
	font-size: 1.1rem;
	padding: 0.25em 0.5em;
	margin: 0 0.5em;
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
	top: 60px;
	width: 98%;
	background-color: var(--white);
	padding: 2em;
	display: ${({ open }) => (open ? 'flex' : 'none')};
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 0.5em;
	border-radius: 8px;
	box-shadow: var(--box-shadow);
	z-index: 50;

	.settingsTitle {
		color: var(--blue);
		font-weight: bold;
		padding-bottom: 0.5em;
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
`;

export const DenominationSettings = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

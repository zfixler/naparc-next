import styled from 'styled-components';

export const SearchContainer = styled.div`
    margin-bottom: 2em;
    align-self: center;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1em;
`;

export const SearchBar = styled.div`
	display: flex;
`;

export const InputWrapper = styled.div`
	display: flex;
    align-items: center;
    padding: .25em .5em;
    background-color: var(--white);
    border-radius: 8px;
    box-shadow: var(--box-shadow);

    input {
        border: none;
        padding: .5em 1em;
        background-color: var(--white);
    }

    input:focus {
        outline: none;
    }
`;

export const Button = styled.button`
    padding: .25em .5em;
    margin: 0 .5em;
    background-color: var(--blue);
    color: var(--white);
    border: none;
    border-radius: 8px;
    box-shadow: var(--box-shadow);
`;

export const SettingsPanel = styled.aside`
    display: ${({open}) => open ? 'block' : 'none'};
`;
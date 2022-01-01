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
    cursor: pointer;
    transition: all .3s ease;

    &:hover, :focus {
        background-color: var(--white);
        color: black;
    }
`;

export const SettingsPanel = styled.aside`
    box-sizing: border-box;
    position: absolute;
    top: 60px;
    width: 100%;
    background-color: var(--white);
    padding: 2em 1em;
    display: ${({open}) => open ? 'flex' : 'none'};
    justify-content: space-between;
    flex-wrap: wrap;
    gap: .5em;
    border-radius: 8px;
    box-shadow: var(--box-shadow);
    z-index: 50;

    .settingsTitle {
        color: var(--blue);
        font-weight: bold;
        padding-bottom: .5em;
    }

    p {
        text-decoration: underline;
        margin-top: .5em;
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
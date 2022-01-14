import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: min(100%, 500px);
    margin: 2em auto;
    background-color: var(--white);
    padding: 1.5em 2em 2em;
    border-radius: 8px;
    box-shadow: var(--box-shadow);
`;

export const Label = styled.label`
    margin: .5em 0;
    color: var(--blue);
`;

export const Input = styled.input`
    border-radius: 8px;
    border: 1px solid var(--blue);
    padding: .5em;
`;

export const Message = styled.textarea`
    border-radius: 8px;
    border: 1px solid var(--blue);
    min-height: 150px;
    padding: .5em;
`;

export const Button = styled.button`
	font-size: 1.1rem;
	padding: 0.25em 0.5em;
	margin: 1em 0 0;
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
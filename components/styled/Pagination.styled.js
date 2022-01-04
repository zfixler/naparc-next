import styled from "styled-components";

export const PageLinks = styled.div`
    width: fit-content;
    margin: 2em auto;

    &:last-of-type {
        margin-top: 3em;
    }
`;

export const PageButton = styled.button`
        background-color: ${({current}) => current ? 'var(--blue)' : 'var(--white)'};
        color: ${({current}) => current ? 'var(--white)' : 'var(--blue)'};
        margin: 0 .5em .5em;
        border: none;
        padding: .75em 1em;
        border-radius: 3px;
        box-shadow: var(--box-shadow);
        cursor: pointer;

`;

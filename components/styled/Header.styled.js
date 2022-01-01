import styled from "styled-components";

export const HeaderContainer = styled.header`
    padding: .5em 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    nav {
        display: flex;
        gap: 1em;
    }

    a {
        text-decoration: none;
        color: var(--blue);
        font-weight: bold;
    }
`;
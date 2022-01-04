import styled from "styled-components";

export const HeaderContainer = styled.header`
    padding: .5em 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    nav {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 1em;

        @media (min-width: 40em){
            flex-direction: row;
        }
    }

    a {
        text-decoration: none;
        color: var(--blue);
        font-weight: bold;
    }
`;
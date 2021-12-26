import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        --font-family: 'Poppins', sans-serif;
    }

    html, body {
        margin: 0;
        padding: 0;
        font-family: var(--font-family);
    }
`;

export default GlobalStyle;

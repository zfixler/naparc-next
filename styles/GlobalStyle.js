import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        --font-family: 'Poppins', sans-serif;

        /* Colors */

        --gray: #eff4fb;
        --white: #fff;
        --blue: #060EC8;

        --box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    html, body, * {
        margin: 0;
        padding: 0;
        font-family: var(--font-family);
    }

    body {
        background-color: var(--gray);
    }

    main {
        padding: 0 1em;
        width: min(90%, 1200px);
        margin: 0 auto;
    }

    header {
        text-align: center;
        gap: 1em;
        display: flex;
        flex-direction: column;
    }

    .headline {
        margin-top: 1em;
        color: var(--blue);
    }

    .resultsWrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 2em;
        justify-content: center;
    }
`;

export default GlobalStyle;

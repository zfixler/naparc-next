import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
        html {
          font-size: 100%;

        @media (min-width: 40em){
            font-size: 112.5%;
        }
    }

    :root {
        /* Colors */
        
        --alice: #eff4fb;
        --white: #fff;
        --blue: #060EC8;
        --gray: #828282;
        
        /* Typography */
        
        --font-family: 'Poppins', sans-serif;

        --fs-h1: 2.488rem;
        --fs-h2: 2.074rem;
        --fs-h3: 1.728rem;
        --fs-h4: 1.44rem;
        --fs-h5: 1.2rem;
        --fs-small: 0.833rem;

        /* Other */

        --box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    html, body, * {
        margin: 0;
        padding: 0;
        font-family: var(--font-family);
        
    }

    html, body {
        background-color: var(--alice);
        height: 100%;
        width: 100%;
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
        width: 100%;
    }

`;

export default GlobalStyle;

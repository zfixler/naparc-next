import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
        html {
          font-size: 87.5%;

        @media (min-width: 40em){
            font-size: 100%;
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

    body {
        overflow-y: scroll;
    }

    h1, h2 {
        text-align: center;
        color: var(--blue);
    }

    h1 {font-size: var(--fs-h1);}
    h2 {font-size: var(--fs-h2);}
    h3 {font-size: var(--fs-h3);}
    h4 {font-size: var(--fs-h4);}
    h5 {font-size: var(--fs-h5);}

    header {
        text-align: center;
        gap: 1em;
        display: flex;
        flex-direction: column;
    }

    .headline {
        margin-top: 1em;
        color: var(--blue);
        position: relative;
    }

    .resultsWrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 2em;
        justify-content: center;
        width: 100%;
    }

    .bold {
        font-weight: bold;
        color: var(--blue);
    }

    .error {
		position: absolute;
		font-size: var(--fs-small);
		font-weight: bold;
		color: red;
		text-align: center;
		top: 4.5em;
		z-index: 400;
		padding: 1em;
		border-radius: 8px;
		background-color: var(--white);
		box-shadow: var(--box-shadow);
	}

`;

export default GlobalStyle;

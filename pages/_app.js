import GlobalStyle from '../styles/GlobalStyle';

function MyApp({ Component, pageProps }) {
	return (
		<main>
			<GlobalStyle />
			<Component {...pageProps} />
		</main>
	);
}

export default MyApp;

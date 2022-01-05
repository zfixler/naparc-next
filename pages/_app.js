import GlobalStyle from '../styles/GlobalStyle';
//Component imports
import { Footer, Header } from '../components';
//Styled components
import { AppWrapper, AppContent } from '../components/styled/App.styled';

function MyApp({ Component, pageProps }) {
	return (
		<AppWrapper>
			<GlobalStyle />
			<AppContent>
				<Header />
				<Component {...pageProps} />
			</AppContent>
			<Footer />
		</AppWrapper>
	);
}

export default MyApp;

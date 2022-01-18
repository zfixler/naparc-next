//Library imports
import Head from 'next/head';
//Context
import { SearchContextProvider } from '../context/SearchContext';
//Component imports
import { Search, Results, Pagination } from '../components';

//Component that displays homepage
export default function Home() {
	return (
		<SearchContextProvider>
			<Head>
				<title>NAPARC Search</title>
				<meta
					name="description"
					content="Find a reformed congregation near you with NAPARC Search."
				/>
				<meta property="og:title" content="NAPARC Search" />
				<meta
					property="og:image"
					content="https://res.cloudinary.com/dke6nfk5z/image/upload/v1642469357/naparc-next-og_pleeaa.png"
				/>
			</Head>
			<header>
				<h1 className="headline">Find a Reformed congregation near you.</h1>
				<Search />
			</header>
			<Pagination />
			<Results />
			<Pagination />
		</SearchContextProvider>
	);
}

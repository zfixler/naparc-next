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
				<meta name="description" content="Find a reformed congregation near you with NAPARC Search." />
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

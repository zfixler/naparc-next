import Head from 'next/head';
import { Search } from '../components';
import { useState } from 'react';

export default function Home() {
	const [results, setResults] = useState(null)

	const display = results !== null ? results.map(r => <h1>{r.name.toUpperCase()}</h1>) : 'No results.'
	
	return (
		<div>
			<Head>
				<title>NAPARC Search</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Hello World</h1>
			<Search props={{results, setResults}}/>
			{display}
		</div>
	);
}

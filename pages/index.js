import Head from 'next/head';
import { Search, ResultCard, Pagination } from '../components';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
	const [results, setResults] = useState(null);
	const [currentPage, setCurrentPage] = useState(0);

	const pageNum = results !== null ? results.meta.pageCount : 0;

	const stagger = {
		hidden: { opacity: 0,
				y: '10px' },
		show: {
			opacity: 1,
			y: '0px',
			transition: { staggerChildren: .3 },
		},
	};

	return (
		<div>
			<Head>
				<title>NAPARC Search</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<h1 className="headline">Find a Reformed congregation near you.</h1>
				<Search props={{ results, setResults }} />
			</header>
			{results !== null && results.meta.pageCount > 1 && (
				<Pagination props={{ pageNum, setCurrentPage, currentPage }} />
			)}
			{results !== null && (
				<motion.div className="resultsWrapper" variants={stagger} initial="hidden" animate="show">
						{results.results[0] ? results.results[currentPage].map((r) => (
							<motion.div variants={stagger}>
								<ResultCard key={r.id} result={r} />
							</motion.div>
						)) : 'Whoops! It looks like that search did not find any congregations. Please adjust your settings and try again.'}
				</motion.div>
			)}
			{results !== null && results.meta.pageCount > 1 && (
				<Pagination props={{ pageNum, setCurrentPage, currentPage }} />
			)}
		</div>
	);
}

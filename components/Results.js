//Library imports
import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
//Component imports
import ResultCard from './ResultCard';
//context imports
import { SearchContext } from '../context/SearchContext';
//Animation imports
import { container, item} from '../animations';

//Component for displaying results form query
function Results() {
	const { results, currentPage } = useContext(SearchContext);

	//TODO: Smooth out card animations on page change
	//Only render component if search results are available
	if (results !== null) {
		return (
			<motion.div
				className="resultsWrapper"
				id="resultsWrapper"
				key={currentPage}
				variants={container}
				initial="hidden"
				animate="show">
					<AnimatePresence>
				{results.results[0]
					? results.results[currentPage].map((r) => (
							<motion.div key={r.id} variants={item}>
								<ResultCard result={r} />
							</motion.div>
					  ))
					  : 'Whoops! It looks like that search did not find any congregations. Please adjust your settings and try again.'}
					  </AnimatePresence>
			</motion.div>
		);
	} else {
		return null;
	}
}

export default Results;

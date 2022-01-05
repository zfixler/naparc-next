//Library imports
import React, { useContext } from 'react';
import { PageLinks, PageButton } from './styled/Pagination.styled';
//Context import
import { SearchContext } from '../context/SearchContext';

//Component that returns pagination
function Pagination() {
	//State from Context
	const { results, setCurrentPage, currentPage } = useContext(SearchContext);
	//Check for page number from API results
	const pageNum = results !== null ? results.meta.pageCount : 0;
	//Set array of page numbers if more than 1
	const pages = [];
	for (let i = 0; i < pageNum; i++) {
		pages.push(i);
	}
	//Only render component if multiple pages of results are available
	if (results !== null && results.meta.pageCount > 1) {
		return (
			<PageLinks>
				{pages.map((p) => {
					if (currentPage === p) {
						return (
							<PageButton
								key={p}
								current={true}
								onClick={() => setCurrentPage(p)}>
								{p + 1}
							</PageButton>
						);
					} else {
						return (
							<PageButton key={p} onClick={() => setCurrentPage(p)}>
								{p + 1}
							</PageButton>
						);
					}
				})}
			</PageLinks>
		);
	} else {
		return null;
	}
}

export default Pagination;

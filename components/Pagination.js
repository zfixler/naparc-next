import React from 'react';
import { PageLinks, PageButton } from './styled/Pagination.styled';

function Pagination({ props }) {
	const { pageNum, setCurrentPage, currentPage } = props;

	const pages = [];
	for (let i = 0; i < pageNum; i++) {
		pages.push(i);
	}
	return (
		<PageLinks>
			{pages.map((p) => {
                if(currentPage === p){
                    return <PageButton key={p} current={true} onClick={() => setCurrentPage(p)}>{p + 1}</PageButton>;
                } else {
                    return <PageButton key={p} onClick={() => setCurrentPage(p)}>{p + 1}</PageButton>;
                }
			})}
		</PageLinks>
	);
}

export default Pagination;

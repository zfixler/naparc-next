import React from 'react';
import { LoadingContainer } from './styled/Loading.styled';

function Loading() {
	return (
		<LoadingContainer>
			<div className="wrapper">
				<div className="one"></div>
				<div className="two"></div>
				<div className="three"></div>
			</div>
		</LoadingContainer>
	);
}

export default Loading;

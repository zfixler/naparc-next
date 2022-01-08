import React from 'react';
import { Card, ButtonWrapper, InfoWrapper } from './styled/ResultCard.styled';

function ResultCard({ result }) {
	const { name, denom, address, website, pastor, phone, email, d } = result;
	const isEmail =
		email === null || email === undefined || email === '' ? false : true;
	const isWebsite =
		website === null || website === undefined || website === '' ? false : true;
	const isPastor =
		pastor === null ||
		pastor === undefined ||
		pastor === '' ||
		pastor === 'Email:'
			? false
			: true;
	const isPhone =
		phone === null || phone === undefined || phone === '' ? false : true;
	return (
		
			<Card>
				<header>
					<h2>{name}</h2>
				</header>
				<InfoWrapper>
					{isPastor && (
						<>
							{pastor.includes('Contact:') ? (
								<p>
									<span>Contact:</span> {pastor.replace(/Contact:/, '')}
								</p>
							) : (
								<p>
									<span>Pastor:</span> {pastor}
								</p>
							)}
						</>
					)}
					<p><span>Denomination:</span> {denom}</p>
					<p>
						<span>{isPhone && 'Phone: '}</span>
						{isPhone && phone}
					</p>
					<p>
						<span>Address: </span>
						{address}
					</p>
				</InfoWrapper>
				<footer>
					<ButtonWrapper>
						<a href={`mailto:${isEmail && email}`} className={isEmail === false && 'disabled'}>Email</a>
						<a href={`${isWebsite && website}`} className={isWebsite === false && 'disabled'}>Website</a>
					</ButtonWrapper>
					<p>Distance: {d} miles.</p>
				</footer>
			</Card>
	);
}

export default ResultCard;

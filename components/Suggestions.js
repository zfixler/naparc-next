import React, { useEffect, useRef, useState } from 'react';
//Styled components
import { SuggestionBox } from './styled/Suggestions.styled';
//Icons
import { Pin } from './icons';

function Suggestions({ props }) {
	//Props from Search Component
	const {
		suggestions,
		inputRef,
		handleSubmit,
		setSearchInput,
		setShowSuggestions,
		activeSuggestion,
	} = props;
	//Suggestion Ref
	const ref = useRef(null);
	const [activeIndex, setActiveIndex] = useState(null)

	useEffect(() => {
		//event listener watching for click outside suggestion box
		document.addEventListener('click', (e) => {
			if (e.target !== ref.current && e.target !== inputRef.current) {
				setShowSuggestions(false);
			}
		});
	}, []);

	return (
		<SuggestionBox ref={ref}>
			{suggestions.results.map((s, i) => {
				return (
					<li key={i} role="tab">
						<button
							className={activeSuggestion === i ? 'active' : ''}
							onClick={(e) => {
								handleSubmit(e, i);
							}}>
							<Pin height="30" width="30" color="var(--blue)" />
							{s.formatted}
						</button>
					</li>
				);
			})}
			<footer>
				Powered by <a href="https://www.geoapify.com/">Geoapify</a>
			</footer>
		</SuggestionBox>
	);
}

export default Suggestions;

import React, { useEffect, useRef } from 'react';
//Styled components
import { SuggestionBox } from './styled/Suggestions.styled';
//Icons
import { Pin } from './icons';

function Suggestions({ props }) {
	//Props from Search Component
	const { suggestions, inputRef, handleSubmit, setSearchInput, setShowSuggestions } = props;
    //Suggestion Ref
    const ref = useRef(null)

    useEffect(() => {
        document.addEventListener("click", (e) => {
            if(e.target !== ref.current && e.target !== inputRef.current){
                setShowSuggestions(false)
            }
        })
        
    }, [])

	return (
		<SuggestionBox ref={ref}>
			{suggestions.results.map((s, i) => (
				<li key={i} role="tab">
					<button
						onClick={(e) => {
							setSearchInput(s.formatted);
							handleSubmit(e, { long: s.lon, lat: s.lat });
						}}>
						<Pin height="30" width="30" color="var(--blue)" />
						{s.formatted}
					</button>
				</li>
			))}
			<footer>
				Powered by <a href="https://www.geoapify.com/">Geoapify</a>
			</footer>
		</SuggestionBox>
	);
}

export default Suggestions;

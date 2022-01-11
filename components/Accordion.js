//Library imports
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
//Styled components
import { Container, Item, Title, Body } from './styled/Accordion.styled';

const ToggleContext = createContext();

function Accordion({ children, ...restProps }) {
	return <Container {...restProps}>{children}</Container>;
}

export default Accordion;

Accordion.Item = function AccordionItem({ id, children, ...restProps }) {
	const [isToggled, setIsToggled] = useState(false);

	useEffect(() => {
		if (window.location.hash.replace(/#/, '') === id) {
			setIsToggled(true);
		}
	}, []);

	return (
		<Item {...restProps}>
			<ToggleContext.Provider value={{ isToggled, setIsToggled }}>
				{children}
			</ToggleContext.Provider>
		</Item>
	);
};

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
	const { isToggled, setIsToggled } = useContext(ToggleContext);

	return (
		<Title {...restProps} onClick={() => setIsToggled(!isToggled)}>
			{children}
		</Title>
	);
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
	const { isToggled } = useContext(ToggleContext);

	return (
		<AnimatePresence>
			{isToggled && (
				<Body
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					transition={{ duration: 0.3 }}
					exit={{ opacity: 0, height: 0 }}
					{...restProps}>
					{children}
				</Body>
			)}
		</AnimatePresence>
	);
};

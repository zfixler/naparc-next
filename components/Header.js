//Library imports
import React from 'react';
import Link from 'next/link';
//Styled components
import { HeaderContainer } from './styled/Header.styled';
//Icons
import { NaparcLogo } from './icons';

//Universal header component, including navigation
function Header() {
	return (
		<HeaderContainer>
			<Link href="/">
				<a>
					<NaparcLogo color="var(--blue)" height="60" width="180" />
				</a>
			</Link>
			<nav>
				<Link href="/faq">FAQ</Link>
				<Link href="/contact">Contact</Link>
			</nav>
		</HeaderContainer>
	);
}

export default Header;

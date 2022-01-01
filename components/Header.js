import React from 'react';
import Link from 'next/link';
import { HeaderContainer } from './styled/Header.styled';
import { NaparcLogo } from '../assets/icons';

function Header() {
	return (
		<HeaderContainer>
			<Link href="/">
				<a>
					<NaparcLogo color="var(--blue)" height="60" width="180" />
				</a>
			</Link>
			<nav>
				<Link href="/about">FAQ</Link>
				<Link href="/contact">Contact</Link>
				<Link href="/about">Resources</Link>
			</nav>
		</HeaderContainer>
	);
}

export default Header;

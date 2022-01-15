//Library imports
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

//Styled components
import { HeaderContainer } from './styled/Header.styled';
//Icons
import { NaparcLogo } from './icons';

//Universal header component, including navigation
function Header() {
	const router = useRouter();

	return (
		<HeaderContainer>
			<Link href="/">
				<a>
					<NaparcLogo color="var(--blue)" height="60" width="180" />
				</a>
			</Link>
			<Link href="/faq#faq-two">
				<a className="beta">BETA</a>
			</Link>
			<nav>
				<Link href="/faq">
					<a className={router.asPath === '/faq' ? 'active' : ''}>FAQ</a>
				</Link>
				<Link href="/contact">
					<a className={router.asPath === '/contact' ? 'active' : ''}>
						CONTACT
					</a>
				</Link>
			</nav>
		</HeaderContainer>
	);
}

export default Header;

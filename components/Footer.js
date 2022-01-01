import React from 'react'
import { FooterContainer } from './styled/Footer.styled';

function Footer() {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <FooterContainer>
            <p>Disclaimer: This website has no official affiliation with NAPARC. All the data contained on this website is publically available online.</p>
            <a href="https://zacharyfixler.com" target="_blank">Built by Zachary Fixler, &copy;{year}.</a>
        </FooterContainer>
    )
}

export default Footer

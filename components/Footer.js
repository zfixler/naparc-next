import React from 'react'
//Styled components
import { FooterContainer } from './styled/Footer.styled';

//Footer component
function Footer() {
    //Dynamic year
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

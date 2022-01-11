import React from 'react';
import { Page } from '../components/styled/Pages.styled';
import { Accordion } from '../components';

function Faq() {
	return (
		<Page>
			<Accordion>
				<h1>Frequently Asked Questions</h1>
				<Accordion.Item id="faq-one">
					<Accordion.Title>What is NAPARC?</Accordion.Title>
					<Accordion.Body>
						<p>
							NAPARC stands for the North American Presbyterian and Reformed
							Council. You may visit their official website{' '}
							<a href="https://naparc.org" target="_blank" nonref="nonreferrer">
								here.
							</a>
						</p>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item id="faq-two">
					<Accordion.Title>
						How many denominations are included?
					</Accordion.Title>
					<Accordion.Body>
						<p>
							There are currently{' '}
							<a
								href="https://www.naparc.org/directories-2/"
								target="_blank"
								nonref="nonreferrer">
								13 denominations
							</a>{' '}
							within NAPARC, although all of them are not currently including in
							this search. Check the denomination key to see the current
							denominations, and check back with us soon. More will be included
							shortly!
						</p>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item id="faq-three">
					<Accordion.Title>How accurate is this information?</Accordion.Title>
					<Accordion.Body>
						<p>
							This website is updated several times per week, in an attempt to
							provide as up to date information as possible. The information is
							gathered from the various denomination websites, however, which
							may not be up to date. If you find information that is out of
							date, please contact the appropriate denomination directly. If
							there are congregations listed on a denomination website that are
							not listed here, please contact me. Thank you!
						</p>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item id="faq-four">
					<Accordion.Title>How is the distance calculated?</Accordion.Title>
					<Accordion.Body>
						<p>
							The distance is calculated straight from longitude and latitude
							points, or "as the crow flies". This will not necessarily be
							accurate for travelling miles, unless of course you are a crow.
						</p>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</Page>
	);
}

export default Faq;

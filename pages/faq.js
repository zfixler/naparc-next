import React from 'react';
import Head from 'next/head';
//Styled Components
import { Page } from '../components/styled/Pages.styled';
//Components
import { Accordion } from '../components';

function Faq() {
	return (
		<Page>
			<Head>
				<title>NAPARC Search | FAQ</title>
				<meta
					name="description"
					content="Frequently asked questions about NAPARC Search."
				/>
			</Head>
			<Accordion>
				<h1>Frequently Asked Questions</h1>
				<Accordion.Item id="faq-one">
					<Accordion.Title>What is NAPARC?</Accordion.Title>
					<Accordion.Body>
						<p>
							NAPARC stands for the North American Presbyterian and Reformed
							Council. You may visit their official website{' '}
							<a href="https://naparc.org" rel="noreferrer" target="_blank">
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
								rel="noreferrer"
								target="_blank">
								13 denominations
							</a>{' '}
							within NAPARC, although all of them are not currently including in
							this search. More will be included shortly!
						</p>
						<p>The denominations currently included in this search are:</p>
						<ul>
							<li>
								<span className="bold">HRC</span>: Heritage Reformed
								Congregations
							</li>
							<li>
								<span className="bold">OPC</span>: Orthodox Presbyterian Church
							</li>
							<li>
								<span className="bold">RPCNA</span>: Reformed Presbyterian
								Church in North America
							</li>
							<li>
								<span className="bold">ARP</span>: Associate Reformed
								Presbyterian Church
							</li>
							<li>
								<span className="bold">URCNA</span>: United Reformed Churches in
								North America
							</li>
							<li>
								<span className="bold">PCA</span>: Presbyterian Church in
								America
							</li>
							<li>
								<span className="bold">FRCNA</span>: Free Reformed Churches of
								North America
							</li>
							<li>
								<span className="bold">RCUS</span>: The Reformed Church in the
								United States
							</li>
						</ul>
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
							points, or &quote;as the crow flies&quote;. This will not
							necessarily be accurate for travelling miles, unless of course you
							are a crow.
						</p>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</Page>
	);
}

export default Faq;

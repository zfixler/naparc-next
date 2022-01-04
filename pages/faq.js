import React from 'react';
import { Page } from '../components/styled/Pages.styled';

function Faq() {
	return (
		<Page>
			<h3>What is NAPARC?</h3>
			<p>
				NAPARC stands for the North American Presbyterian and Reformed Council.
				You may visit their official website{' '}
				<a href="https://naparc.org" target="_blank" nonref="nonreferrer">
					here.
				</a>
			</p>

			<h3>How many denominations are included in NAPARC?</h3>
			<p>
				There are currently{' '}
				<a
					href="https://www.naparc.org/directories-2/"
					target="_blank"
					nonref="nonreferrer">
					13 denominations
				</a>{' '}
				within NAPARC, although all of them are not currently including in this
				search. Check the denomination key to see the current denominations, and
				check back with us soon. More will be included shortly!
			</p>

			<h3>How accurate is this information?</h3>
			<p>
				This website is updated several times per week, in an attempt to provide
				as up to date information as possible. The information is gathered from
				the various denomination websites, however, which may not be up to date.
				If you find information that is out of date, please contact the
				appropriate denomination directly. If there are congregations listed on
				a denomination website that are not listed here, please contact me.
				Thank you!
			</p>

			<h3>How is the distance calculated?</h3>
			<p>
				The distance is calculated straight from longitude and latitude points,
				or "as the crow flies". This will not necessarily be accurate for
				travelling miles, unless of course you are a crow.
			</p>
		</Page>
	);
}

export default Faq;

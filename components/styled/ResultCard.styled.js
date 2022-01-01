import styled from 'styled-components';

export const Card = styled.article`
	background-color: var(--white);
	padding: 1em;
	border-radius: 8px;
	box-shadow: var(--box-shadow);
	width: 450px;
	max-width: 90%;
	height: 95%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 1em;

	h2 {
		color: var(--blue);
		text-transform: uppercase;
		text-align: center;
	}

	a {
		padding: 0.5em 1em;
		margin: 0 0.5em;
		background-color: var(--blue);
		color: var(--white);
		border: none;
		border-radius: 8px;
		text-decoration: none;
		box-shadow: var(--box-shadow);
		transition: all 0.3s ease;

		&:hover,
		:focus {
			background-color: var(--white);
			color: black;
		}
	}

	span {
		font-weight: bold;
		color: var(--blue);
	}

	footer {
		p {
			margin-top: 0.75em;
			text-align: center;
		}
	}
`;

export const ButtonWrapper = styled.section`
	margin: 0 0 1em;
`;

export const InfoWrapper = styled.section`
	align-self: flex-start;
	margin-left: calc(10%);
	margin-right: calc(10%);
	p {
		margin: 1em 0;
	}
`;

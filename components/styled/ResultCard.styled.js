import styled from 'styled-components';

export const Card = styled.article`
	background-color: var(--white);
	padding: 1em;
	border-radius: 8px;
	box-shadow: var(--box-shadow);
	width: min(450px, 85vw);
	height: 95%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 1em;

	h2 {
		text-transform: uppercase;
		margin-top: .75em;
	}

	header {
		gap: 0;
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

	.disabled {
			background-color: var(--gray);
			pointer-events: none;

			&:hover, &:focus {
				background-color: var(--gray);
				color: var(--white);
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

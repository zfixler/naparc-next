import styled from 'styled-components';

export const SuggestionBox = styled.ul`
	position: absolute;
	background-color: var(--white);
	box-shadow: var(--box-shadow);
	border-radius: 8px;
	top: 3.5em;
	width: 100%;
	z-index: 100;

	li {
		list-style-type: none;

		&:first-of-type {
			button {
				padding-top: 0.25em;

				&:hover,
				&:focus-visible {
					border-radius: 8px 8px 0 0;
				}
			}
		}
		&:last-of-type {
			button {
				padding-bottom: 0.25em;
			}
		}
	}

	button {
		border: none;
		background-color: inherit;
		font-size: inherit;
		padding: 0.25em 0.5em;
		text-align: start;
		display: flex;
		align-items: center;
		margin: 0;
		cursor: pointer;
		gap: 0.5em;
		width: 100%;
		border-radius: 0;
        display: grid;
        grid-template-columns: 30px auto;

		&:hover,
		&:focus-visible {
			background-color: #d9dbff;
			color: #3f51b5;
		}

	}
	
	.active {
		background-color: #d9dbff;
		color: #3f51b5;
	}

	footer {
		font-size: var(--fs-small);
		margin: 0.25em 0;
	}
`;

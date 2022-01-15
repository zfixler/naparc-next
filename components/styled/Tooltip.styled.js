import styled from 'styled-components';

export const TooltipContainer = styled.div`
	height: fit-content;
	display: flex;
	align-self: center;
	position: relative;
`;

export const Message = styled.p`
	position: absolute;
	background-color: var(--gray);
	color: var(--white);
	top: 1em;
	width: 12em;
	left: calc(-6em);
	padding: 0.5em;
	border-radius: 8px;
	text-align: center;

	&::before {
		content: ' ';
		position: absolute;
		bottom: 100%; /* At the bottom of the tooltip */
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent var(--gray) transparent;
	}
`;

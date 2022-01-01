import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
       0% {
            transform: translateY(0)
        }
        45% {
            transform: translateY(-25px)
        }
        95% {
            transform: translateY(5px)
        }
        100% {
            transform: translateY(0px)
        }
`;

export const LoadingContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 100;
	display: grid;
	place-content: center;

	.wrapper {
		display: flex;
		gap: 1em;

		.one,
		.two,
		.three {
			background-color: var(--blue);
			height: 40px;
			width: 40px;
			border-radius: 50%;
		}

		.one {
			animation-name: ${bounce};
			animation-duration: 1s;
            animation-timing-function: ease-in-out;
            animation-delay: 0s;
			animation-iteration-count: infinite;
		}

        .two {
            animation-name: ${bounce};
			animation-duration: 1s;
            animation-timing-function: ease-in-out;
            animation-delay: .5s;
			animation-iteration-count: infinite;
        }
        .three {
            animation-name: ${bounce};
			animation-duration: 1s;
            animation-timing-function: ease-in-out;
            animation-delay: .75s;
			animation-iteration-count: infinite;
        }
	}
`;

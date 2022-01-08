import React from 'react';

function pin({ width, height, color, className }) {
	return (
		<svg
			enableBackground="new 0 0 126 95.36"
			width={width}
			height={height}
			version="1.1"
			viewBox="0 0 126 95.36"
			xmlns="http://www.w3.org/2000/svg">
			<g strokeMiterlimit="10">
				<path
					d="m77.85 32.641c0 3.947-5.508 14.63-9.125 24.591-3.803 10.476-5.725 20.148-5.725 20.148s-1.932-9.655-5.741-20.148c-3.611-9.948-9.109-20.65-9.109-24.591 0-8.097 6.648-14.661 14.85-14.661s14.85 6.564 14.85 14.661z"
					stroke={color}
					strokeWidth=".1268"
					fill={color}
				/>
				<ellipse
					cx="63"
					cy="32.446"
					rx="6.697"
					ry="6.875"
					stroke="#fff"
					strokeWidth="2.75"
					fill={color}
				/>
			</g>
		</svg>
	);
}

export default pin;

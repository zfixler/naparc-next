import React from 'react';

function close({ width, height, color, className, onClick }) {
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			className={className}
			onClick={onClick}
			style={{ backgroundColor: 'var(--white)' }}
			viewBox="0 0 32 32">
			<title>Close</title>
			<path
				d="M20.95 9.636l-4.95 4.95-4.95-4.95-1.414 1.414 4.95 4.95-4.95 4.95 1.414 1.414 4.95-4.95 4.95 4.95 1.414-1.414-4.95-4.95 4.95-4.95-1.414-1.414z"
				fill={color}></path>
		</svg>
	);
}

export default close;

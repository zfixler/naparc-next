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
			<path d="M16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16c8.822 0 16-7.178 16-16s-7.178-16-16-16zM16 30c-7.72 0-14-6.28-14-14s6.28-14 14-14c7.72 0 14 6.28 14 14s-6.28 14-14 14z" fill={color}></path>
			<path
				d="M20.95 9.636l-4.95 4.95-4.95-4.95-1.414 1.414 4.95 4.95-4.95 4.95 1.414 1.414 4.95-4.95 4.95 4.95 1.414-1.414-4.95-4.95 4.95-4.95-1.414-1.414z"
				fill={color}></path>
		</svg>
	);
}

export default close;

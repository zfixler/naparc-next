import React from 'react';

function settings({width, height, color, onClick, className}) {
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 32 32"
			style={{backgroundColor: 'var(--white)'}}
			className={className}
			onClick={onClick}>
			<title>settings</title>
			<path d="M18.143 32h-4.285c-0.409 0-0.776-0.248-0.929-0.629l-0.836-2.090c-0.948-0.277-1.86-0.656-2.723-1.127l-2.068 0.887c-0.375 0.156-0.811 0.076-1.101-0.213l-3.030-3.029c-0.289-0.289-0.373-0.725-0.212-1.102l0.886-2.068c-0.472-0.865-0.85-1.777-1.127-2.721l-2.090-0.838c-0.379-0.152-0.628-0.52-0.628-0.928v-4.285c0-0.408 0.249-0.775 0.628-0.928l2.090-0.838c0.277-0.943 0.655-1.855 1.127-2.721l-0.886-2.068c-0.161-0.377-0.077-0.813 0.212-1.102l3.030-3.029c0.289-0.289 0.726-0.369 1.101-0.213l2.068 0.887c0.862-0.471 1.774-0.85 2.723-1.127l0.836-2.090c0.152-0.381 0.52-0.629 0.929-0.629h4.285c0.409 0 0.776 0.248 0.929 0.629l0.836 2.090c0.948 0.277 1.86 0.656 2.723 1.127l2.068-0.887c0.376-0.156 0.811-0.076 1.101 0.213l3.030 3.029c0.289 0.289 0.373 0.725 0.212 1.102l-0.886 2.068c0.472 0.865 0.85 1.777 1.127 2.721l2.090 0.838c0.379 0.152 0.628 0.52 0.628 0.928v4.285c0 0.408-0.249 0.775-0.628 0.928l-2.090 0.838c-0.277 0.943-0.655 1.855-1.127 2.721l0.886 2.068c0.161 0.377 0.077 0.813-0.212 1.102l-3.030 3.029c-0.289 0.289-0.725 0.369-1.101 0.213l-2.068-0.887c-0.862 0.471-1.774 0.85-2.723 1.127l-0.836 2.090c-0.152 0.381-0.52 0.629-0.929 0.629zM14.534 30h2.932l0.769-1.922c0.119-0.297 0.372-0.52 0.683-0.598 1.108-0.283 2.164-0.721 3.137-1.301 0.276-0.164 0.612-0.184 0.906-0.061l1.903 0.816 2.073-2.072-0.815-1.902c-0.126-0.295-0.104-0.631 0.060-0.906 0.582-0.979 1.020-2.033 1.299-3.137 0.079-0.311 0.301-0.563 0.598-0.682l1.923-0.77v-2.934l-1.923-0.77c-0.297-0.119-0.519-0.371-0.598-0.682-0.279-1.104-0.717-2.158-1.299-3.137-0.163-0.275-0.186-0.611-0.060-0.906l0.815-1.902-2.073-2.072-1.903 0.816c-0.294 0.123-0.63 0.104-0.906-0.061-0.973-0.58-2.028-1.018-3.137-1.301-0.311-0.078-0.564-0.301-0.683-0.598l-0.769-1.922h-2.932l-0.769 1.922c-0.119 0.297-0.372 0.52-0.683 0.598-1.108 0.283-2.164 0.721-3.137 1.301-0.275 0.164-0.614 0.184-0.906 0.061l-1.903-0.816-2.073 2.072 0.815 1.902c0.126 0.295 0.104 0.631-0.060 0.906-0.582 0.979-1.020 2.033-1.299 3.137-0.079 0.31-0.301 0.563-0.598 0.682l-1.923 0.77v2.934l1.923 0.77c0.297 0.119 0.519 0.371 0.598 0.682 0.279 1.104 0.717 2.158 1.299 3.137 0.163 0.275 0.186 0.611 0.060 0.906l-0.815 1.902 2.073 2.072 1.903-0.816c0.292-0.123 0.631-0.104 0.906 0.061 0.973 0.58 2.028 1.018 3.137 1.301 0.31 0.078 0.563 0.301 0.683 0.598l0.769 1.922zM31 18.143v0z" fill={color} stroke={color} ></path>
			<path d="M16 24c-4.411 0-8-3.588-8-8s3.589-8 8-8c4.411 0 8 3.588 8 8s-3.589 8-8 8zM16 10c-3.309 0-6 2.691-6 6s2.691 6 6 6c3.309 0 6-2.691 6-6s-2.691-6-6-6z" fill={color} stroke={color} ></path>
		</svg>
	);
}

export default settings;
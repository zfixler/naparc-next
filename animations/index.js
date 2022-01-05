//Animations
export const staggerChildren = {
	hidden: { opacity: 0, y: '10px' },
	show: {
		opacity: 1,
		y: '0px',
		transition: { staggerChildren: 0.3 },
	},
};

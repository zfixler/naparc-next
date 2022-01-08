//Animations
export const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.3, type: "spring", stiffness: 120 },
	}
}; 

export const item = {
	hidden: { opacity: 0, y: '10px' },
	show: {
		opacity: 1,
		y: '0px'
	}
};

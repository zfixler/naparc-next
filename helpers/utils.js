export function getMeters(i) {
	return i*1609.344;
}

export function getMiles(i){
	return Math.round(i/1609.344);
}
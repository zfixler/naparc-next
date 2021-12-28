import { distance } from './utils';
import naparc from '../data/database.json';
const axios = require('axios');

const getPosition = async (i) => {
	if (i.length === 5) {
		const data = await axios.get(`https://api.zippopotam.us/us/${i}`).catch(error => console.log(error));
		if (data) {
			return { lat: data.data.places[0].latitude, long: data.data.places[0].longitude };
		} else {
			return 'This ZIP code is incorrect.';
		}
	} else if (i.length === 3) {
		const data = await axios.get(`https://api.zippopotam.us/CA/${i}`).catch(error => console.log(error));
		if (data) {
			return { lat: data.data.places[0].latitude, long: data.data.places[0].longitude };
		} else {
			return 'This postal code is incorrect.';
		}
	}
};

export const search = async (location, dis = 50) => {
	const searchArea = await getPosition(location).catch((error) =>
		console.log(error)
	);
    console.log(searchArea)
    if(typeof searchArea !== 'string'){
        const filteredArr = naparc.filter((cong) => cong !== null);
        const congArr = filteredArr.map((cong) => {
            const d = distance(cong.lat, cong.long, searchArea.lat, searchArea.long, dis);
            cong.d = Math.round(d);
            return cong;
        });
        
        const closestResults = congArr.filter((cong) => cong.d < dis);
        const sorted = closestResults.sort((a, b) => a.d - b.d);
        return sorted;
    } else {
        return searchArea
    }
};

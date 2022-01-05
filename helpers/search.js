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

export const search = async (body) => {

	// const searchArea = await getPosition(body.searchInput).catch((error) =>
	// 	console.log(error)
	// );

    if(typeof body.searchInput !== 'string'){
        const congArr = naparc.map((cong) => {
            const d = distance(cong.lat, cong.long, body.searchInput.lat, body.searchInput.long);
            cong.d = Math.round(d);
            return cong;
        });
        const filteredResults = congArr.filter(c => {
			let den = c.denom.toLowerCase();
			if(body[den] !== false && c.d < body.dis){
				return c
			} 
		})

        const sorted = filteredResults.sort((a, b) => a.d - b.d);
        return sorted;
    } else {
        return body.searchInput
    }
};

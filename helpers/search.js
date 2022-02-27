import { distance } from './utils';
const { MongoClient } = require('mongodb');
const axios = require('axios');

//Return lon and lat from zip code submitted for us or ca
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

	    //MongoDB uri
		const uri = `mongodb+srv://zfixler:${process.env.MONGO_PASSWORD}@naparc.hnt60.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
		const client = new MongoClient(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		//Connect to Mongo Client
		await client.connect();
		const db = client.db('NAPARC');
		// db.collection('congregations').createIndex( { "location": "2dsphere" })
		const search = db.collection('congregations').aggregate([
			{
			  $geoNear: {
				 near: { type: "Point", coordinates: [ body.searchInput.long, body.searchInput.lat ] },
				 distanceField: "d",
			  }
			},
			{
				$limit: 36
			}
		 ])
		const results = [];
		for await(const res of search){
			results.push(res)
		}
		return results;

	// Code below for hitting MongoDB as REST API
	// const data = JSON.stringify({
	// 	"collection": "congregations",
	// 	"database": "NAPARC",
	// 	"dataSource": "NAPARC",
	// 	"limit": 5000,
	// });
	// const config = {
	// 	method: 'post',
	// 	url: 'https://data.mongodb-api.com/app/data-uwadh/endpoint/data/beta/action/find',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		'Access-Control-Request-Headers': '*',
	// 		'api-key': `${process.env.NAPARC_API}`
	// 	},
	// 	data : data
	// };
	// const naparc = await axios(config).catch(err => console.log(err));


	//If zip code submitted for US or Canada
	// if(typeof body.searchInput === 'string'){
	// 	const searchArea = await getPosition(body.searchInput).catch((error) =>
	// 	console.log(error))
	// 	if(typeof searchArea !== 'string'){
	// 		const congArr = naparc.data.documents.map((cong) => {
	// 			const d = distance(cong.lat, cong.long, searchArea.lat, searchArea.long);
	// 			cong.d = Math.round(d);
	// 			return cong;
	// 		});
	// 		const filteredResults = congArr.filter(c => {
	// 			let den = c.denom.toLowerCase();
	// 			if(body[den] !== false && c.d < body.dis){
	// 				return c
	// 			} 
	// 		})
	// 		const sorted = filteredResults.sort((a, b) => a.d - b.d);
	// 		return sorted;
	// 	} else {
	// 		return searchArea
	// 	}
	// }

	//If lon and lat submitted from autocomplete API
    // if(typeof body.searchInput !== 'string'){
    //     const congArr = naparc.data.documents.map((cong) => {
    //         const d = distance(cong.lat, cong.long, body.searchInput.lat, body.searchInput.long);
    //         cong.d = Math.round(d);
    //         return cong;
    //     });
    //     const filteredResults = congArr.filter(c => {
	// 		let den = c.denom.toLowerCase();
	// 		if(body[den] !== false && c.d < body.dis){
	// 			return c
	// 		} 
	// 	})

    //     const sorted = filteredResults.sort((a, b) => a.d - b.d);
    //     return sorted;
    // } else {
    //     return body.searchInput
    // }
};

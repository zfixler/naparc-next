import { getMeters } from './utils';
const { MongoClient } = require('mongodb');
const axios = require('axios');

//Return lon and lat from zip code submitted for us or ca
const getPosition = async (i) => {
	if (i.length === 5) {
		const data = await axios
			.get(`https://api.zippopotam.us/us/${i}`)
			.catch((error) => console.log(error));
		if (data) {
			return {
				lat: data.data.places[0].latitude,
				long: data.data.places[0].longitude,
			};
		} else {
			return 'This ZIP code is incorrect.';
		}
	} else if (i.length === 3) {
		const data = await axios
			.get(`https://api.zippopotam.us/CA/${i}`)
			.catch((error) => console.log(error));
		if (data) {
			return {
				lat: data.data.places[0].latitude,
				long: data.data.places[0].longitude,
			};
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

	let long = null;
	let lat = null;

	if (typeof body.searchInput === 'string') {
		const searchArea = await getPosition(body.searchInput).catch((error) =>
			console.log(error)
		);
		long = Number(await searchArea.long);
		lat = Number(await searchArea.lat);
	} else {
		long = body.searchInput.long;
		lat = body.searchInput.lat;
	}

	// Filter for denomination

	const denomList = () => {
		return Object.entries(body).reduce((memo, array) => {
			if (array[1] === true) {
				memo.push(array[0].toUpperCase());
				return memo;
			}
			return memo;
		}, []);
	};

	//Connect to Mongo Client
	await client.connect();
	const db = client.db('NAPARC');
	const search = db.collection('congregations').aggregate([
		{
			$geoNear: {
				near: {
					type: 'Point',
					coordinates: [long, lat],
				},
				distanceField: 'd',
				query: { denom: { $in: denomList() } },
				maxDistance: getMeters(body.dis),
			},
		},
		{ $limit: 36 },
	]);
	const results = [];
	for await (const res of search) {
		results.push(res);
	}
	return results;
};

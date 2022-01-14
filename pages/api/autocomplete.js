const axios = require('axios');

export default async function handler(req, res) {
	const data = req.body.input;
	let url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${data}&type=city&filter=countrycode:us,ca&format=json&apiKey=${process.env.GEOAPIFY_KEY}`;
	const locationRequest = await axios.get(url);
	const suggestion = await locationRequest.data;
	res.status(200).json(JSON.stringify(suggestion));
}

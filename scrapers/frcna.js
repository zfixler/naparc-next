const cheerio = require('cheerio');
const axios = require('axios');
const dbRepo = require('../helpers/database');

let id = 0;

function getUrlList(html) {
	const $ = cheerio.load(html);

	const urlArray = [];

	$('h3').each((i, el) => {
		const url = $(el).children().attr('href');
		urlArray.push(url);
	});

	return urlArray;
}

async function scrapeCong(html, url) {
	try {
		const $ = cheerio.load(html);
		const info = $('.itemExtraFields');

		let congregation = {
			id: `frcna-${id}`,
			denom: 'FRCNA',
			name: null,
			pastor: null,
			address: null,
			phone: null,
			website: null,
			email: null,
			long: null,
			lat: null,
		};

		congregation.name = $('h2').text().trim();

		info.find('span').each((i, el) => {
			if ($(el).text().includes('Minister')) {
				congregation.pastor = $(el).next().text().trim();
			} else if (
				$(el).html().includes('Address') &&
				congregation.address === null
			) {
				congregation.address = $(el)
					.next()
					.html()
					.replace(/\n/g, '')
					.replace(/<p>*/g, '')
					.replace(/<\/p>*/g, '')
					.replace(/<br>*/g, ' ')
					.replace(/<.*/g, '')
					.replace(/&nbsp/g, '')
					.replace(/Tel:(.*)/g, '')
					.replace(/Bulletin:(.*)/g, '')
					.replace(/\(\d\d\d\)(.*)/g, '')
					.replace(/\s\s+/g, ' ')
					.trim();
			} else if ($(el).text().includes('Website')) {
				congregation.website = $(el).next().text();
			} else if (congregation.website === null) {
				congregation.website = `https://www.frcna.org${url}`;
			}
		});

		info.find('span').each((i, el) => {
			if (
				$(el)
					.html()
					.match(/[(]?[0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}/)
			) {
				congregation.phone = $(el)
					.html()
					.match(/[(]?[0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}/g)[0];
			} else if (
				$(el)
					.html()
					.match(/[[0-9]{3}[-][0-9]{3}[-][0-9]{4}/)
			) {
				congregation.phone = $(el)
					.html()
					.match(/[[0-9]{3}[-][0-9]{3}[-][0-9]{4}/)[0];
			} else if (
				$(el)
					.html()
					.match(/[[0-9]{3}[ ][0-9]{3}[-][0-9]{4}/)
			) {
				congregation.phone = $(el)
					.html()
					.match(/[[0-9]{3}[ ][0-9]{3}[-][0-9]{4}/)[0];
			} else {
				return null;
			}
		});

		if (
			congregation.address.match(/\d{5}/g) &&
			!congregation.address.match(/[A-Z]\d[A-Z]/g)
		) {
			const zip = congregation.address.match(/\d{5}/g)[0];
			const url = `http://api.zippopotam.us/us/${zip}`;

			const res = await axios.get(url);
			const json = await res.data;

			const lat = await json.places[0].latitude;
			const long = await json.places[0].longitude;

			congregation.lat = lat;
			congregation.long = long;
		} else if (congregation.address.match(/[A-Z]\d[A-Z]/g) !== null) {
			const zip = congregation.address.match(/[A-Z]\d[A-Z]/g)[0];
			const url = `http://api.zippopotam.us/CA/${zip}`;

			const res = await axios.get(url);
			const json = await res.data;

			const lat = await json.places[0].latitude;
			const long = await json.places[0].longitude;

			congregation.lat = lat;
			congregation.long = long;
		}
		id++;
		return congregation;
	} catch {
		(error) => console.log(error);
	}
}

export default async function scrapeFrcna() {
	try {
		const response = await axios.get(
			'https://frcna.org/component/k2/itemlist/category/5'
		);
		const html = await response.data;
		const urlList = await getUrlList(html);

		for await (const url of urlList) {
			const response = await axios
				.get(`http://www.frcna.org${url}`)
				.catch((error) => console.log(error));
			const html = await response.data;
			const cong = await scrapeCong(html, url);
            
			if (cong.lat !== null) {
				if (dbRepo.dbRepo.getById(cong.id)) {
					dbRepo.dbRepo.update(cong.id, cong);
				} else {
					dbRepo.dbRepo.create(cong);
				}
			}
		}
	} catch {
		(error) => console.log(error);
	}
}

const cheerio = require('cheerio');
const axios = require('axios');
const dbRepo = require('../helpers/database');

let id = 0;

async function scrapeCongs() {
    const rcus = [];

	const response = await axios.get(`https://rcus.org/find-a-church/`);
	const html = await response.data;

	const $ = cheerio.load(html);

    $('p').each((i, el) => {
        console.log($(el).text())
    })


    // for await (congregation of rcus) {
    //     if (
    //         congregation.address.match(/\d{5}/g) &&
    //         !congregation.address.match(/[A-Z]\d[A-Z]/g)
    //     ) {
    //         const zip = congregation.address.match(/\d{5}/g)[0];
    //         const url = `http://api.zippopotam.us/us/${zip}`;
    
    //         const res = await fetch(url);
    //         const json = await res.json();
    
    //         if (json.places !== undefined) {
    //             const lat = await json.places[0].latitude;
    //             const long = await json.places[0].longitude;
    
    //             congregation.lat = lat;
    //             congregation.long = long;
    //         }
    //     } else if (congregation.address.match(/[A-Z]\d[A-Z]/g) !== null) {
    //         const zip = congregation.address.match(/[A-Z]\d[A-Z]/g)[0];
    //         const url = `http://api.zippopotam.us/CA/${zip}`;
    
    //         const res = await fetch(url);
    //         const json = await res.json();
    
    //         if (json.places !== undefined) {
    //             const lat = json.places[0].latitude;
    //             const long = json.places[0].longitude;
    
    //             congregation.lat = lat;
    //             congregation.long = long;
    //         }
    //     }
    
    //     console.log(congregation);
    // }
}


scrapeCongs().catch((e) => console.log(e));

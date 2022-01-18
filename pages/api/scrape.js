import fetchUrl from '../../scrapers/urcna';
import scrapeRpcna from '../../scrapers/rpcna';
import getUrls from '../../scrapers/prc';
import getPages from '../../scrapers/pca';
import scrapeOpc from '../../scrapers/opc';
import getLongLat from '../../scrapers/hrc';
import scrapeFrcna from '../../scrapers/frcna';
import createArpJson from '../../scrapers/arp';

export default async function handler(req, res) {
	const { APP_KEY } = process.env;
  	const { ACTION_KEY } = req.headers.authorization.split(" ")[1];
	
	try {
		if(ACTION_KEY === APP_KEY){
			const rpcna = await scrapeRpcna().catch((e) => console.log(e));
			const urcna = await fetchUrl().catch((e) => console.log(e));
			const prc = await getUrls().catch((e) => console.log(e));
			const pca = await getPages().catch((e) => console.log(e));
			const opc = await scrapeOpc().catch((e) => console.log(e));
			const hrc = await getLongLat().catch((e) => console.log(e));
			const frcna = await scrapeFrcna().catch((e) => console.log(e));
			const arp = await createArpJson().catch((e) => console.log(e));
			res.status(200).json({ message: 'Scrape Complete' });
		} else {
			res.status(401)
		}
	} catch(err){
		res.status(500)
	}
}

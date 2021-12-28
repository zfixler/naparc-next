import { search } from '../../helpers/search';

export default async function handler(req, res) {
	const results = await search(req.body.location);
	res.status(200).send(JSON.stringify(await results, null, 4));
}
import { search } from '../../helpers/search';

export default async function handler(req, res) {
	const results = await search(req.body.body);
	res.status(200).json(JSON.stringify(await results, null, 4));
}
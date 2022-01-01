import { search } from '../../helpers/search';

export default async function handler(req, res) {
	const results = await search(req.body.body);

	const totalCount = await results.length;
	const perPage = 6;
	const pageCount = Math.ceil(totalCount / perPage);

	const paginatedArr = [];

	for(let i = 0; i < results.length; i += perPage){
		paginatedArr.push(results.slice(i, i + perPage))
	};

	const data = {
		meta: {
			totalCount: totalCount,
			pageCount: pageCount,
		},

		results: paginatedArr
	}
	
	res.status(200).json(JSON.stringify(data, null, 4));
}
const axios = require('axios');

export default async function handler(req, res) {
	axios.post(`https://submit-form.com/${process.env.FORMSPARK_ID}`, {
		name: req.body.name,
		email: req.body.email,
		message: req.body.message,

		_email: {
			from: req.body.email,
			subject: `${req.body.name} has contacted you from NAPARC Search`,
			template: {
				title: false,
				footer: false,
			},
		},
	});
	res.status(200).json({ msg: 'success!', name: req.body.name });
}

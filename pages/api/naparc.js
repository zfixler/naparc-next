import naparc from '../../data/database.json';

export default function handler(req, res) {
    const names = naparc.map(cong => {
        return cong.name
    })
	res.status(200).send(names);
}
import connection from "../../../database/connection";
import getUsers from "../../../database/controllers/getUsers";
export default function Users(req, res) {
	connection();

	const { method } = req;

	switch (method) {
		case "GET":
			getUsers(req, res);
			break;
		default:
			console.log("Case default");
			res.status(405).end(`${method} method is not allowed.`);
			break;
	}
}

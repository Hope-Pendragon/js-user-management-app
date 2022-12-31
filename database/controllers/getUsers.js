import User from "../models/User";

export default async function getClients(_, res) {
	try {
		const users = await User.find();

		res.status(200).json(users);
	} catch (error) {
		console.log("[Error] @/database/controllers/getClients");
		res.status(404).json({ error: error });
	}
}

import mongoose, { connect } from "mongoose";
mongoose.set("strictQuery", false);
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: process.env.MONGODB_DB,
};

export default async function connection() {
	try {
		connect(process.env.MONGODB_URI, options);
		console.log("Connected to database.");
	} catch (error) {
		return new Promise.reject(error);
	}
}

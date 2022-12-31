import { Schema } from "mongoose";

const address = new Schema(
	{
		address: {
			street: String,
			suburb: String,
			city: String,
			postcode: String
		}
	},
	{
		_id: false,
		strictQuery: false,
		minimize: false
	}
);

export default address;
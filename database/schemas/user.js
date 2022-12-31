import { Schema } from "mongoose";
import address from "../schemas/address";
import contactDetails from "../schemas/contactDetails";

const user = new Schema(
	{
		name: {
			type: {
				first: String,
				last: String,
			},
			required: true,
		},
		contactDetails: {
			type: contactDetails,
			required: true,
		},
		address: address,
		vatNumber: String,
	},
	{
		strictQuery: false,
		timestamps: {
			currentTime: () => Math.floor(Date.now() / 1000),
		},
	}
);

export default user;

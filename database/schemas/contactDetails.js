import { Schema } from "mongoose";

const contactDetails = new Schema(
	{
		contactDetails: {
			contactNumber: String,
			email: {
				type: String,
				unique: true,
				lowercase: true,
				trim: true,
			},
		},
	},
	{
		_id: false,
		strictQuery: false,
		minimize: false,
	}
);

export default contactDetails;

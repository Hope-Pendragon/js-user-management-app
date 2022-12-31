import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
	name: "form",
	initialState: {
		showForm: true,
		formType: "add",
		formSubmitStatus: "pending",
	},
	reducers: {
		toggleShow(state) {
			state.showForm = !state.showForm;
		},
	},
});

export const formActions = formSlice.actions;

export default formSlice;

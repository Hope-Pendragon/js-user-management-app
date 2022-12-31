import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./reducers";

export const store = configureStore({
	reducer: {
		form: formSlice.reducer,
	},
});

export default store;

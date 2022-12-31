import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../redux/reducers";
export default function Users() {
	const showForm = useSelector((state) => state.form.showForm);
	const dispatch = useDispatch();
	console.log(showForm);

	function handleClick(event) {
		console.log("clicked");
		dispatch(formActions.toggleShow());
	}
	return (
		<section>
			<Head>
				<title>Client Manager</title>
				<link rel="icon" href="users-solid.svg"></link>
			</Head>

			<main>
				<h1 className="ClientManager__Header">Client Management</h1>
				<button onClick={handleClick}>
					Toggle show: {showForm ? "true" : "false"}
				</button>
				{/* <Form__Collapsable handleClick={handleClick} /> */}

				{/* <View__Table /> */}
			</main>
		</section>
	);
}

import { useReducer } from "react"; 
// import { useReducer } from "react"; #UPDATE+
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux"; #UPDATE+
import { setFormSubmitStatusAction, toggleChangeAction } from "../../redux/reducer.temp"; 
// import { toggleFlagChangeAction } from "../../redux/reducer.temp"; #UPDATE+
import { addEmployee, getEmployees } from "../lib/helper"; // #UPDATE—
// import { updateEmployee, updateEmployees } from "../lib/helper";  #UPDATE+
import Icon from "../utils/icons";

function formReducer (state, formData) {
	return {
		...state,
		...formData
	}
}

export default function ClientForm () {

	const queryClient = useQueryClient();
	// STATE
	// # Global
	const selectedEmployee = useSelector((state) => state.app.client.selectedEmployee); // #UPDATE+
	const formSubmitStatus = useSelector((state) => state.app.client.formSubmitStatus); // #UPDATE+
	// # Local
	const [formData, setFormData] = useReducer(formReducer, 
		extractFormDataFromEmployee(selectedEmployee) || {
			firstName: "",
			lastName: "",
			avatar: getRandomAvatar(),
			email: "",
			salary: 0,
			date: new Date().toLocaleDateString(),
			status: ""
		}
	);
	// # UPDATE || # ADD

	// HOOKS -- #UPDATE+
	// Updates form data and repopulates form fields when the selected employee changes
	useEffect(() => {
		setFormData(extractFormDataFromEmployee(selectedEmployee));
	}, [selectedEmployee])



	// REDUX DECLARATIONS -- # ADD
	const dispatch = useDispatch();
	
	const addMutation = useMutation(addEmployee, {
		onSuccess: () => {
			dispatch(setFormSubmitStatusAction("Added"));
			dispatch(toggleChangeAction());
			queryClient.prefetchQuery("employees", getEmployees);
		}
	});

	// FUNCTIONS
	// # UPDATE ++
	function handleChange (event) {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		setFormData({ [name]: value });
	}


	// # UPDATE +
	// function handleSubmit (event) {
	// 	event.preventDefault();

	// 	// Use mutate to call updateEmployees function
		updateMutation.mutate({
			employeeId: selectedEmployee._id,
			formData: composeFormDataIntoEmployee(formData)
		});
	// }

	// if (updateMutation.isLoading) {
	// 	// return <div>Loading...</div>
	// 	dispatch(setFormSubmitStatusAction("Loading"));
	// 	return;
	// }
	// if (updateMutation.isError) {
	// 	// return <Error message={`Error: ${updateMutation.error.message}`}></Error>
	// 	dispatch(setFormSubmitStatusAction("Error"));
	// 	return;
	// }

	// # ADD
	function handleSubmit (event) {
		event.preventDefault();

		let { firstName, lastName, email, salary, date, status } = formData;
		const model = {
			name: `${firstName} ${lastName}`,
			avatar: getRandomAvatar(),
			email: email,
			salary: salary,
			date: date ?? new Date().toLocaleDateString(),
			status: status ?? "Active"
		}

		addMutation.mutate(model);
	}

	// # ADD
	if (addMutation.isLoading) {
		dispatch(setFormSubmitStatusAction("Loading"));
		return;
	}

	if (addMutation.isError) {
		dispatch(setFormSubmitStatusAction("Error"));
		return;
	}

	if (addMutation.isSuccess) {
		dispatch(setFormSubmitStatusAction("Added"));
		return;
	}

	// REDUX DECLARATIONS -- #UPDATE
	// const dispatch = useDispatch();
	const updateMutation = useMutation(updateEmployee, {
		onSuccess: () => {
			dispatch(setFormSubmitStatusAction("Updated"));
			dispatch(toggleChangeAction());
			dispatch(toggleFlagChangeAction());
			queryClient.prefetchQuery("employees", getEmployees);
			return;
		}
	});
	// ALT RETURNS
	// if (updateMutation.isLoading) return <div>Loading...</div>;
	// if (updateMutation.isError) return <Error message={`Error: ${updateMutation.error.message}`} />;


	return (
		<form className="Form Wrapper" onSubmit={handleSubmit}>

			<div className={`Input Text Wrapper`}>
				<input className={`border w-full px-5 py-3 focus:outline-none rounded-md`}
					onChange={handleChange}
					type="text"
					name={`firstName`}
					placeholder={`First Name`}
					value={formData.firstName} // # UPDATE +
				></input>
			</div>
			<div className={`Input Text Wrapper`}>
				<input className={`border w-full px-5 py-3 focus:outline-none rounded-md`}
					onChange={handleChange}
					type="text"
					name={`lastName`}
					placeholder={`Last Name`}
					value={formData.lastName} // # UPDATE +
				></input>
			</div>
			<div className={`Input Text Wrapper`}>
				<input className={`border w-full px-5 py-3 focus:outline-none rounded-md`}
					onChange={handleChange}
					type="text"
					name={`email`}
					placeholder={`Email`}
					value={formData.email} // # UPDATE +
				></input>
			</div>
			<div className={`Input Text Wrapper`}>
				<input className={`border w-full px-5 py-3 focus:outline-none rounded-md`}
					onChange={handleChange}
					type="text"
					name={`salary`}
					placeholder={`Salary`}
					value={formData.salary} // # UPDATE +
				></input>
			</div>

			<div className={`Input Date Wrapper`}>
				<input className={`px-5 py-3 border rounded-md focus:outline-none`}
					onChange={handleChange}
					type="date"
					name={`date`}
					value={formData.date} // # UPDATE +
				/>
			</div>

			<div className="RadioButton Group">
				<div className={`RadioButton Wrapper`}>
					<label className={`Label inline-block text-gray-800`} htmlFor={`Radio_Default_1`}>{`Active`}</label>
					<input onChange={handleChange} className={`Input`} type="radio" id={`Radio_Default_1`} name={`status`} 
						value={`status`} // # UPDATE +
					checked={(formData.status === "Active") ? true : false}></input>
				</div>
				<div className={`RadioButton Wrapper`}>
					<label className={`Label inline-block text-gray-800`} htmlFor={`Radio_Default_2`}>{`Inactive`}</label>
					<input onChange={handleChange} className={`Input`} type="radio" id={`Radio_Default_2`} name={`status`} 
						value={`Inactive`} // # UPDATE +
					checked={(formData.status === "Inactive") ? true : false}></input>
				</div>
			</div>
			{/* # UPDATE || # ADD */}
			<button className="Button Submit Update">Update || ADD<span className="px-1"><Icon icon="Brush" className={`w-6 h-6`} /></span></button>
		</form>
	);
}


// UTILITIES
function extractFormDataFromEmployee (employee) {
	const firstName = String((employee.name).split(" ").slice(0, 1));
	const lastName = String(employee.name.split(" ").slice(1));
	const formData = { ...employee, firstName: firstName, lastName: lastName };

	return formData;
}

function composeFormDataIntoEmployee (formData) {
	const employee = {
		name: `${formData.firstName} ${formData.lastName}`,
		avatar: formData.avatar || getRandomAvatar(),
		email: formData.email,
		salary: formData.salary,
		date: formData.date,
		status: formData.status
	};

	return employee;
}

function getRandomAvatar () {
	let randomValue = Math.floor(Math.random() * 9);
	let randomGender;
	let randomAvatar;
	if (randomValue > 0) {
		randomValue = Math.floor(Math.random() * 80);
		randomGender = (randomValue % 2) ? "men" : "women";
		randomAvatar = `https://randomuser.me/api/portraits/${randomGender}/${randomValue}.jpg`;

	} else {
		randomValue = Math.floor(Math.random() * 9);
		randomGender = "lego";
		randomAvatar = `https://randomuser.me/api/portraits/${randomGender}/${randomValue}.jpg`;
	}
	return randomAvatar;
}

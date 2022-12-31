import Input from "./Input";
import inputs from "@/src/data/inputs";
import Button from "@/components/_Controls/Button";
import { useDispatch } from "react-redux";
import { useQueryClient } from "react-query";
import { useEffect } from "react";

export default function ClientForm () {

	const queryClient = useQueryClient();

	// selectedClient
	// formSubmissionStatus
	// formData
	// clientFormType -- but this is why AddClient and UpdateClient forms exist?
	const dispatch = useDispatch();
	
	useEffect( () => {
		dispatch(setFormDataAction())
	},
		[ selectedClient ]	
	);

	const clientFormMutation = defineMutation( clientFormType, _mutationFunction, dispatch, queryClient, _queryFunction );

	// EVENT HANDLERS
	function handleChange ( event ) {
		event.preventDefault();

		mutateMutation( { clientFormType, clientFormMutation } );
	}

	function handleSubmit ( event ) {
		event.preventDefault();

		mutateMutation( { clientFormType, clientFormMutation } );
	}

	mutationCleanUpHandler( { clientFormType } );

	return (
		<form className={`Form`} onSubmit={handleSubmit}>
			{ getTextInputs() }
			<Input type="date" onChange={handleChange} name={`date`} value={ formData.date } />
			<RadioButton__Group />
			<Button type={"submit"} handleClick={handleClick} title={getSubmitButtonTitle()} icon={getSubmitButtonIcon()} />
		</form>
	)
}

function getTextInputs() {
	const { inputProps } = inputs.text.inputProps;
	const inputComponents = inputProps.map( 
		( input ) => {
			const { _id, name, placeholder } = input;
			return (
				<Input type="text" key={ _id } 
					name={name}
					placeholder={placeholder}
					value={formData.name}
				/>
			);
		} 
	);
	return inputComponents;
}

function RadioButton__Group () {
	const { inputProps } = inputs.radio.inputProps;
	return (
		<div className={`RadioButton__Group`}>
			{
				inputProps.map( ( input ) => {
					const { id, title, name, value, checked } = input;
					return (
						<Input type="radio" key={ id } 
							id={id}
							title={title}
							name={name}
							value={value}
							checked={checked}
						/>
					);
				} )
			}
		</div>
	);
}

function getSubmitButtonTitle ( { type } ) {
	return ( type === "add" ) ? "Add Client" : "Update Client";
}

function getSubmitButtonIcon ( { type } ) {
	return ( type === "add" ) ? "plus" : "brush";
}


function mutationCleanUpHandler( { type } ) {
	const dispatch = useDispatch();

	if ( type === "add" ) {
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
	} else {
			if (updateMutation.isLoading) {
				dispatch(setFormSubmitStatusAction("Loading"));
				return;
			}

			if (updateMutation.isError) {
				dispatch(setFormSubmitStatusAction("Error"));
				return;
			}
	}
}

function mutateMutation( { type, mutation } ) {
	if ( type === "add" ) {
	
		let { firstName, lastName, email, salary, date, status } = formData;
		const model = {
			name: `${firstName} ${lastName}`,
			avatar: getRandomAvatar(),
			email: email,
			salary: salary,
			date: date ?? new Date().toLocaleDateString(),
			status: status ?? "Active"
		}

		mutation.mutate(model);
	} else { 
		mutation.mutate({
			employeeId: selectedClient._id,
			formData: composeFormDataIntoEmployee(formData)
		});
	 }
}

function defineMutation( { type, mutationFunction, dispatch, queryClient, queryFunction } ) {
	if ( type === "add" ) {
		return useMutation(mutationFunction, {
			onSuccess: () => {
				dispatch(setFormSubmitStatusAction("Added"));
				dispatch(toggleChangeAction());
				queryClient.prefetchQuery("employees", queryFunction);
			}
		});
	} else {
			return useMutation(mutationFunction, {
				onSuccess: () => {
					dispatch(setFormSubmitStatusAction("Updated"));
					dispatch(toggleChangeAction());
					dispatch(toggleFlagChangeAction());
					queryClient.prefetchQuery("employees", queryFunction);
			}
		});
	}
}
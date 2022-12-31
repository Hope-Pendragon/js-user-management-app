import Input from "./_Form/_ClientForm/Input";
import inputs from "@/src/data/inputs";
import Button from "@/components/_Controls/Button";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { setFormDataAction, setFormSubmitStatusAction } from "@/redux/reducer";
import { postClient, putClient } from "@/database/controllers";
import cleanup from "@/src/hooks/changeDataMutationCleanup";

export default function ClientForm () {
	
	// "Refresh" client data - get the client data whenever there is a change to it, keeps the view table updated
	const queryClient = useQueryClient();
	
	const dispatch = useDispatch();

	// State
	const formType = useSelector( ( state ) =>state.app.client.clientFormType );
	
	const formData = useSelector( ( state ) =>state.app.client.formData );
	
	const selectedClient = useSelector( ( state ) =>state.app.client.selectedClient );
	
	// useEffect( () => {
	// 	dispatch(setFormDataAction(formData))
	// }, [dispatch, formData] );

	// Declarations of the possible values for changeDataMutation 
	const addMutation = useMutation(postClient, {
		onSuccess: () => {
			dispatch(setFormSubmitStatusAction("added"));
			queryClient.prefetchQuery("clients", queryFunction);
		}
	});

	const updateMutation = useMutation(putClient, {
		onSuccess: () => {
			dispatch(setFormSubmitStatusAction("updated"));
			queryClient.prefetchQuery("clients", queryFunction);
		}
	});
	
	const changeDataMutation = ( formType === "add" ) ? addMutation : updateMutation;


	// EVENT HANDLERS
	// Any time a form value changes, update the form data
	function handleChange ( event ) {
		const name = event.target.name;
		const value = event.target.value;
		
		// useDispatch(setFormDataAction( { [name]: value } ));
	}

	// Sends form data 
	function handleSubmit ( event ) {
		event.preventDefault();
		
		changeDataMutation.mutate();
	}

	if (changeDataMutation.isLoading) {
		dispatch(setFormSubmitStatusAction("loading"));
		return;
	}
	if (changeDataMutation.isError) {
		dispatch(setFormSubmitStatusAction("error"));
		return;
	}
	if (changeDataMutation.isSuccess) {
		cleanup(dispatch);
		return;
	}

	const buttonTitle = ( formType === "add" ) ? "Add" : "Update";
	const icon =  ( formType === "add" ) ? "plus" : "brush";

	return (
		<form className={`Form`} onSubmit={handleSubmit}>
			<input type="text" onChange={handleChange} name="name" value={formData.name}></input>
			{ getTextInputElements(formData, handleChange) }
			<Input type="date" onChange={handleChange} name={`date`} value={ formData.date } />
			<RadioButton__Group formData={formData} />
			<Button type={"submit"} handleClick={handleSubmit} title={buttonTitle} icon={icon} />
		</form>
	)
}

function getTextInputElements( formData, handleChange ) {
	const inputProps = inputs.text.inputProps;
	const inputComponents = inputProps.map( 
		( input ) => {
			const { id, name, placeholder } = input;
			return (
				<Input type="text" key={ id } 
					onChange={handleChange}
					name={name}
					placeholder={placeholder}
					value={formData.name}
				/>
			);
		} 
	);
	return inputComponents;
}

function RadioButton__Group (formData) {
	const inputProps = inputs.radio.inputProps;
	return (
		<div className={`RadioButton__Group`}>
			{
				inputProps.map( ( input ) => {
					const { id, title, name, value } = input;
					const checked = ( formData.name === "active" && value === "active" ) ? true : false; 
			
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

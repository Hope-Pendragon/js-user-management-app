import Input from "./_Form/_ClientForm/Input";
import inputs from "@/src/data/inputs";
import Button from "@/components/_Controls/Button";


export default function Form() {
	
	function getTextInputElements() {
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

	const buttonTitle = ( formType === "add" ) ? "Add Client" : "Update Client";
		
	const icon =  ( formType === "add" ) ? "plus" : "brush";

	return (
		<form className={`Form`} onSubmit={handleSubmit}>
			{ getTextInputElements() }
			<Input type="date" onChange={handleChange} name={`date`} value={ formData.date } />
			<RadioButton__Group />
			<Button type={"submit"} handleClick={handleClick} title={buttonTitle} icon={icon} />
		</form>
	)
}
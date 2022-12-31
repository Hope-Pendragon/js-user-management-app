import Error from "../_Messages/Error";
import Input__Date from "./_Input/Date";
import Input__Radio from "./_Input/Radio";
import Input__Text from "./_Input/Text";
import inputs from "@/src/data/inputs";

export default function Input ( { type, handleChange, name, value, inputProps } ) {

	switch ( type ) {
		case ( "text" ):
			return <Input__Text{ ...restProps } />;
		case ( "date" ):
			const textProps = { ...inputs.text.sharedProps };
			return (
				 <Input__Date { ...restProps } 
						onChange={handleChange}
						wrapperClass={textProps.wrapperClass}
						inputClass={textProps.inputClass} 
					/>
			);
		break;
		case ( "radio" ):
			const radioProps = { ...inputs.radio.sharedProps };
			return (
				<Input__Radio { ...restProps } 
					onChange={handleChange}
					wrapperClass={radioProps.wrapperClass}
					labelClass={radioProps.labelClass}
					inputClass={radioProps.inputClass}
				/>
			);
		default:
			return (
				<Error 
					message={`Error: Unable to create component, invalid input type specified.`}
				/>
			);
		break;
	}
}
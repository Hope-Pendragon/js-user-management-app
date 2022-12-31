export default function Input__Date ( { wrapperClass = "", inputClass = "" } ) {

	const { handleChange, name, value } = restProps;

	return (
		<div className={`Input__Date--wrapper ${wrapperClass}`}>
			<input className={`Input__Date ${inputClass}`}
				type="date"
				onChange={ handleChange }
				name={name}
				value={value}
			/>
		</div>
	);
}
export default function Input__Text ( props ) {

	const { handleChange, name, placeholder, classNames = { div: "", input: "" } } = props;
	
	return (
		<div className={`Input__Text--wrapper ${classNames.div}`}>
			<input className={`Input__Text ${classNames.input}`}
				onChange={ handleChange }
				type="text"
				name={name}
				placeholder={placeholder}
			></input>
		</div>
	);
}
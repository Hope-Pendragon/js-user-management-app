import { useEffect, useState } from "react";

export default function Input__Radio ( props ) {

	const { handleChange, id, title, name, value, wrapperClass, labelClass, inputClass } = props;

	return (
		<div className={`Input__Radio--wrapper ${wrapperClass}`}>
			<label className={`FormLabel ${labelClass}`} htmlFor={id}>{title}</label>
			<input onChange={ handleChange } className={`Input__Radio ${inputClass}`} type="radio" id={id} name={name} value={value} ></input>
		</div>
	);
}
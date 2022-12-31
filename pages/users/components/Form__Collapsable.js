import { useSelector } from "react-redux";
import AddClient from "@/components/clients/_Form/AddClient";
import UpdateClient from "@/components/clients/_Form/UpdateClient";
import StatusMessage__FormSubmit from "@/components/_Controls/StatusMessage__FormSubmit";
import Button__ToggleFormType from "@/components/_Controls/Button__ToggleFormType";

export default function Form__Collapsable ( { handleClick } ) {

	const clientFormType = useSelector( (state) => state.app.client.clientFormType );
	const formSubmitStatus = useSelector((state) => state.app.client.formSubmitStatus);

	return (
		<div className="Section__ClientForm">
			<div className="Button__ToggleFormType--wrapper">
				<Button__ToggleFormType
					classNames={``}
					buttonType={`button`}
					handleClick={handleClick}
					title={`Add Client`}
					icon={`user-plus`}
				/>
			</div>
			<StatusMessage__FormSubmit status={formSubmitStatus} />
			<div className="ClientForm__Form--wrapper ">
				{clientFormType === "add" && <AddClient />}
				{clientFormType === "update" && <UpdateClient />}
			</div>
		</div>
	);
}

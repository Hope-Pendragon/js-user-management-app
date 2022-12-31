import Icon from "@/components/Icon";


export default function Error ({ message }) {

	return (
		<div className="StatusMessage">
			<div className="Message__Error">
				{message}<Icon name="x" iconClass={`w-6 h-6 fill-red-400`} />
			</div>
		</div>
	);
}
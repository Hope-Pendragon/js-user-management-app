import Icon from "@/components/Icon";

export default function Success({ message  }  ) {

	return (
		<div className="StatusMessage">
			<div className="Message__Success">
				{message}<Icon name="check" iconClass={`w-6 h-6 fill-green-400`} />
			</div>
		</div>
	);
}
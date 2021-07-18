import React, {Fragment} from "react";

class OrderComplete extends React.Component<{}, {}> {
	constructor(props: {}, context: any) {
		super(props, context);
		this.state = {}
	}

	render() {
		return (
			<Fragment>
				<h1> Your order is complete!</h1>
				<p> Thank you for becoming a member of the association!</p>
			</Fragment>
		)
	}
}

export default OrderComplete

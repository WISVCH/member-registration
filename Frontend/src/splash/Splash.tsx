import React, {Fragment} from "react";
import {Button} from "react-bootstrap";
import styled from "styled-components";
import {LinkContainer} from 'react-router-bootstrap'


const CenteredButton = styled(Button)`
	margin: auto;
`;

class Splash extends React.Component<{}, {}> {
	constructor(props: {}, context: any) {
		super(props, context);
		this.state = {}
	}

	render() {
		return (
			<Fragment>
				<h1> Welcome to the CH member's registration tool</h1>
				<p> Become a member today and enjoy all the activities that CH has to offer, cheaper books and a fun
					start of your student life.</p>
				<LinkContainer to="/form">
					<CenteredButton className="btn-primary">Register Now!</CenteredButton>
				</LinkContainer>
			</Fragment>
		)
	}
}

export default Splash

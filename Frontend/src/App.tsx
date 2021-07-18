import React from 'react';
import FormCH from "./form/FormCH";
import styled from 'styled-components';
import CHLogo from './resources/CH Logo.png';
import Splash from "./splash/Splash";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import PayPage from "./pay/Pay";
import OrderComplete from "./orderComplete/OrderComplete";
import AdminDashboard from "./backend/AdminDashboard";

const Background = styled.div`
	width: 100vw;
	height: auto;
`;

const Box = styled.div`
	background-color: white;
	margin-left: 25%;
	margin-top: 1%;
	width: 50%;
	height: auto;
	padding: 1% 1%;
	border-radius: 10px;
	@media screen and (max-width: 768px) {
		width: 100%;
		margin: 0;
	}
	
`
const CustomForm = styled(FormCH)`
`

const Logo = styled.img`
	height: 20rem;
	width: auto;
 	margin-left: auto;
  	margin-right: auto;
  	display: block;
  `

function App() {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<Switch>
				<Route path="/admin/overview">
					<AdminDashboard/>
				</Route>
				<Route path="/orderComplete">
					<Background>
						<Box>
							<OrderComplete/>
						</Box>
					</Background>
				</Route>
				<Route path="/pay" render={(props) => (
					<Background>
						<Box>
							<PayPage {...props}/>
						</Box>
					</Background>
				)}/>
				<Route path="/form">
					<Background>
						<Box>
							<Form/>
						</Box>
					</Background>
				</Route>
				<Route exact path="/">
					<Background>
						<Box>
							<Splash/>
						</Box>
					</Background>
				</Route>
			</Switch>
		</Router>
	)
		;
}


function Form() {
	return (
		<div>
			<Logo src={CHLogo} alt="Logo"/>
			<CustomForm/>
		</div>
	)
}

export default App;

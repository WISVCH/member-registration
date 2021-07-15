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
import TableView from "./backend/TableView";

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
		<Router>
			<Background>
				<Box>
					<Switch>
						<Route path="/pay" render={(props) => <PayPage {...props}/>}/>
						<Route path="/form">
							<Form/>
						</Route>
						<Route path="/admin/overview">
							<TableView/>
						</Route>
						<Route path="/orderComplete">
							<OrderComplete/>
						</Route>
						<Route path="/">
							<Splash/>
						</Route>
					</Switch>

				</Box>
			</Background>
		</Router>
	);
}

function Form() {
	return (
		<div>
			<Logo src={CHLogo} alt="Logo"/>
			<CustomForm/>
		</div>
	)
}

export const ServerDomain = "http://localhost:9000"

export default App;

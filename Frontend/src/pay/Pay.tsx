import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom"
import IdealLogo from './../resources/ideal.png';
import SofortLogo from './../resources/sofort.png';
import axios from "axios";
import {contextPath} from "../App";

const products = [
	{title: "Membership 1st year student (€25,-)", key: "0bba7e47-db2e-4dd8-9eac-8cceeb9a1ebf"},
	{title: "Membership 2nd year student (€20,-)", key: "7b495ae1-c413-405f-b7ee-7758b8cdfb99"},
	{title: "Membership 3rd year student (€15,-)", key: "b7c4ba93-7145-4042-8027-21c35443d8ce"},
	{title: "Membership Master student (€10,-)", key: "5946f684-67c0-4da4-9096-b58b1db17389"}]

const getPaymentsInfo = async (name: string, email: string, products: string[], paymentprovider: string) => {
	let answer : any;
	try {
		answer = await axios.post(`${contextPath}/api/payment`, {
			name: name,
			email: email,
			productKeys: products,
			returnUrl: "https://ch.tudelft.nl/registration/orderComplete",
			method: paymentprovider
		});
	} catch (e) {
		return {error: "something went wrong! Please try again later!", url: undefined}
	}
	window.location.href = answer.data.url;
}


const PayPage = (props: { history: any, location: any, match: any, staticContext?: any }) => {

	const history = useHistory()

	if (!props?.location?.state?.name) {
		history.push("/")
	}
	const name = props.location.state.name
	const email = props.location.state.email

	const [selectProduct, setSelectedProduct] = useState("")

	return (
		<Fragment>
			<h1> Welcome {name}</h1>
			<p> Become a member today and enjoy all the activities that CH has to offer, cheaper books and a fun
				start of your student life.</p>

			{products.map(x => renderProduct(selectProduct, x.title, x.key, () => setSelectedProduct(x.key)))}

			<br/>
			{selectProduct ?
				(<div className="row">
				<div className="col-6 col-md-6 mb-4">
					<div className="card h-100">
						<div className="card-body h-100">
							<div className="row h-100">
								<div className="col-md-8 px-3">
									<PayImg className="img-thumbnail"
											src={IdealLogo} alt=""/>
								</div>
								<div className="col-md-8 h-100">
									<div className="row h-100">
										<div className="col-md-12 align-self-start mb-4">
											<h5 className="d-inline mt-0">IDEAL</h5> - Online payment using your
											Dutch bank. Easy, fast and secure!<br/>

											<span className="text-info">(+ &euro; 0,35 transaction cost)</span>
										</div>

										<div className="col-md-10 align-self-end">
											<div onClick={() => getPaymentsInfo(name, email, [selectProduct], "IDEAL")}
											   className="btn btn-block btn-primary">
												Pay with iDeal
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-6 col-md-6 mb-4">
					<div className="card h-100">
						<div className="card-body h-100">
							<div className="row h-100">
								<div className="col-md-8 px-3">
									<PayImg className="img-thumbnail"
											src={SofortLogo} alt=""/>
								</div>
								<div className="col-md-9 h-100">
									<div className="row h-100">
										<div className="col-md-12 align-self-start mb-4">
											<h5 className="d-inline mt-0">SOFORT</h5> - Predominant online banking
											method in
											countries across Europe.<br/>

											<span className="text-info">(+ &euro; 0,30 + 1,1% transaction cost)</span>
										</div>

										<div className="col-md-10 align-self-end">
											<div onClick={() => getPaymentsInfo(name, email, [selectProduct], "SOFORT")}
											   className="btn btn-block btn-primary">
												Pay with SOFORT
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>) : ''}
		</Fragment>
	)
}


const renderProduct = (selectedProduct: string | undefined, name: string, reference: string, onClick: any) => {
	return <PaymentBlock selected={reference === selectedProduct} onClick={onClick}>
		<p>{name}</p>
	</PaymentBlock>
}

const PayImg = styled.img`
	max-width: 144px;
	padding: 20px;
	margin-bottom: 1rem;
`;

const PaymentBlock = styled.div<{ selected: boolean }>`
	width: 80%;
	height: 2rem;
	margin: 0 auto;
	background-color: ${props => props.selected ? "#dddddd" : "white"};
	&:hover {
		text-decoration: underline;
		cursor: pointer;	
	}
`

export default PayPage

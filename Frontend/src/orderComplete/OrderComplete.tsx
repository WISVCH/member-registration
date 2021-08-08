import React, {Fragment} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {contextPath} from "../App";

const signalPaymentComplete = async (reference: string) => {
	try {
		await axios.post(`${contextPath}/api/payment/complete`, {
			reference: reference
		});
	} catch (e) {
		console.error(e)
	}
}

function OrderComplete() {
	// @ts-ignore
	let { reference } = useParams();
	if (reference) {
		signalPaymentComplete(reference)
	}


	return (
			<Fragment>
				<h1> Your order is complete!</h1>
				<p> Thank you for becoming a member of the association!</p>
			</Fragment>
		)
}

export default OrderComplete

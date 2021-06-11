package com.wisv.ch.memberregistration.paidstatus.controller

import org.springframework.web.bind.annotation.*
import java.io.DataOutputStream
import java.net.HttpURLConnection
import java.net.URL


@RestController
@RequestMapping("/payment")
class PaymentController {

	@GetMapping
	@ResponseBody
	fun createPayment() {
		return createRequest("https://ch.tudelft.nl/payments/api/orders/7102fe32-b592-4118-b0ce-bed67e4a11d7/")
	}


	fun createRequest(url: String) {

	}
}

package com.wisv.ch.memberregistration.paidstatus.controller

import com.wisv.ch.memberregistration.member.service.MemberService
import com.wisv.ch.memberregistration.paidstatus.model.OrderStatusDTO
import com.wisv.ch.memberregistration.paidstatus.model.PaidStatus
import com.wisv.ch.memberregistration.paidstatus.model.Payment
import com.wisv.ch.memberregistration.paidstatus.model.PaymentDTO
import com.wisv.ch.memberregistration.paidstatus.service.PaymentRepository
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.boot.configurationprocessor.json.JSONArray
import org.springframework.boot.configurationprocessor.json.JSONObject
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.RequestBody


@RestController
@RequestMapping("/payment")
class PaymentController(val memberService: MemberService, val paymentRepository: PaymentRepository) {
	val client = OkHttpClient()



	@PostMapping
	fun createPayment(@Validated @RequestBody info: PaymentDTO): String {
		val JSON: MediaType = "application/json; charset=utf-8".toMediaTypeOrNull()!!
		val jsonObject = JSONObject()
		val jsonArr = JSONArray()
		jsonArr.put(info.productKeys[0])
		val JSONString = jsonObject
			.put("name", info.name)
			.put("email", info.email)
			.put("productKeys", jsonArr)
			.put("returnUrl", info.returnUrl)
			.put("method", info.method)
			.put("webhook", "http://ch.tudelft.nl/registration/api/payment")
			.toString()
		println(JSONString)
		val formBody: okhttp3.RequestBody = JSONString.toRequestBody(JSON)

		val request: Request = Request.Builder()
			.url("https://ch.tudelft.nl/payments/api/orders")
			.post(formBody)
			.build()

		val call: Call = client.newCall(request)
		val response: Response = call.execute()
		val jsonData: String = response.body?.string() ?: ""
		val jsonResponseObject = JSONObject(jsonData)

		val member = memberService.getMemberByEmail(info.email)
		val paymentStatus = PaidStatus.fromString(jsonResponseObject.getString("status"))
		val product = info.productKeys[0]
		val publicReference = jsonResponseObject.getString("publicReference")
		val payment = Payment()
		payment.member = member
		payment.paymentStatus = paymentStatus
		payment.product = product
		payment.publicReference = publicReference
		paymentRepository.save(payment)

		return jsonData
	}

	@GetMapping
	fun webHookEntryPoint(@Validated @RequestBody info: OrderStatusDTO) {
		val request: Request = Request.Builder()
			.url("https://ch.tudelft.nl/payments/api/orders/" + info.publicReference)
			.build()

		val call: Call = client.newCall(request)
		val response: Response = call.execute()
		val status: PaidStatus = PaidStatus.fromString(JSONObject(response.body?.string()).getString("status"))
		val payment = paymentRepository.getByPublicReference(info.publicReference)
		payment.paymentStatus = status
		paymentRepository.save(payment)
	}



}

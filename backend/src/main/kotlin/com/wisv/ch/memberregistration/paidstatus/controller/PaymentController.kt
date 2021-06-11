package com.wisv.ch.memberregistration.paidstatus.controller

import com.wisv.ch.memberregistration.paidstatus.model.PaymentDTO
import okhttp3.*
import okhttp3.MediaType.Companion.parse
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.boot.configurationprocessor.json.JSONArray
import org.springframework.boot.configurationprocessor.json.JSONObject
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.RequestBody
import java.io.DataOutputStream
import java.net.HttpURLConnection
import java.net.URL


@RestController
@RequestMapping("/payment")
class PaymentController {
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

		return jsonData
	}

}

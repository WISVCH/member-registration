package com.wisv.ch.memberregistration.member.controller

import com.wisv.ch.memberregistration.member.model.Member
import com.wisv.ch.memberregistration.member.service.MemberService
import com.wisv.ch.memberregistration.paidstatus.model.PaidStatus
import com.wisv.ch.memberregistration.paidstatus.model.Payment
import com.wisv.ch.memberregistration.paidstatus.service.PaymentRepository
import com.wisv.ch.memberregistration.utils.ResponseEntityBuilder
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.boot.configurationprocessor.json.JSONObject
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.text.SimpleDateFormat
import java.util.*

@RestController
@RequestMapping("/admin/members")
class MemberAdminRestController(val memberService: MemberService, val paymentRepository: PaymentRepository) {
	val client = OkHttpClient()


	@GetMapping("/unhandled")
	fun getAllNotInLdb(): List<Member> {
		return this.memberService.getAllNotInLDB();
	}


	@GetMapping("/all")
	fun getAllMembers(): List<Member> {
		return this.memberService.getAllMembers();
	}

	fun getPriceByProductKey(key: String): Int {
		return when (key) {
			"0bba7e47-db2e-4dd8-9eac-8cceeb9a1ebf" -> 25
			"7b495ae1-c413-405f-b7ee-7758b8cdfb99" -> 20
			"b7c4ba93-7145-4042-8027-21c35443d8ce" -> 15
			"5946f684-67c0-4da4-9096-b58b1db17389" -> 10
			else -> 1
		}
	}

	fun Boolean.toInt() = if (this) 1 else 0

	@GetMapping("/dienst/{netid}")
	fun webHookEntryPoint(@PathVariable netid: String): ResponseEntity<*> {
		val member = memberService.getMemberByNetId(netid)

		var formatter = SimpleDateFormat("YYYY-MM-dd")
		val payment: Payment = paymentRepository.getByMember(member)
		val pricePayed: Int = getPriceByProductKey(payment.product)


		val JSON: MediaType = "application/json; charset=utf-8".toMediaTypeOrNull()!!
		val studentJSONObject = JSONObject()
			.put("emergency_name", member.emergencyName)
			.put("emergency_phone", member.emergencyPhone)
			.put("study", member.study)
			.put("student_number", member.studentNumber)
		val employeeJSONObject = JSONObject()
			.put("faculty", "EEMCS")
			.put("department", "student")
			.put("function", "student")
			.put("phone_internal", "0000")
		val dateTo = Calendar.getInstance()
		dateTo.add(Calendar.YEAR, pricePayed/5)
		val memberJSONObject = JSONObject()
			.put("date_to", formatter.format(dateTo.time))
			.put("amount_paid", pricePayed)

		val mainBody = JSONObject()
			.put("initials", member.initials)
			.put("firstname", member.firstname)
			.put("preposition", member.preposition)
			.put("surname", member.surname)
			.put("gender", member.gender[0])
			.put("birthdate", formatter.format(member.birthdate))
			.put("street_name", member.streetName)
			.put("house_number", member.houseNumber)
			.put("postcode", member.postCode)
			.put("city", member.city)
			.put("country", member.country)
			.put("email", member.email)
			.put("phone_mobile", member.phoneMobile)
			.put("netid", member.netid)
			.put("revision_comment", "Inserted by member registration tool")
			.put("alumnus", JSONObject())
			.put("member", memberJSONObject)
			.put("employee", employeeJSONObject)
			.put("student", studentJSONObject)
			.put("mail_announcements", member.mailActivity.toInt())
			.put("mail_company", member.mailCareer.toInt())
			.put("mail_education", member.mailEducation.toInt())
			.put("machazine", member.machazine.toInt())
			.toString()

		val requestBody: okhttp3.RequestBody = mainBody.toRequestBody(JSON)

		val request: Request = Request.Builder()
			.url("http://localhost:8000/ldb/api/v3/people/") // TODO add the dienst url to env
			.addHeader("Authorization", "Token 71ee66e2648a49ade0c8db7a5b4837f05a048328") //TODO add token in env
			.addHeader("Content-Type", "application/json")
			.post(requestBody)
			.build()

		val call: Call = client.newCall(request)
		val response: Response = call.execute()
		return if (response.code == 201) {
			ResponseEntityBuilder.createResponseEntity(HttpStatus.OK, "User successfully added to dienst ldb.");
		} else {
			ResponseEntityBuilder.createResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, response.body?.string() ?: "");
		}
	}
}

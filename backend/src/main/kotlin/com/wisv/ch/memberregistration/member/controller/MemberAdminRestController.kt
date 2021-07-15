package com.wisv.ch.memberregistration.member.controller

import com.wisv.ch.memberregistration.member.model.Member
import com.wisv.ch.memberregistration.member.service.MemberRepository
import com.wisv.ch.memberregistration.member.service.MemberService
import com.wisv.ch.memberregistration.paidstatus.model.Payment
import com.wisv.ch.memberregistration.paidstatus.service.PaymentRepository
import com.wisv.ch.memberregistration.utils.DienstFormatter
import com.wisv.ch.memberregistration.utils.ResponseEntityBuilder
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@EnableConfigurationProperties
@RequestMapping("/admin/members")
class MemberAdminRestController(val memberService: MemberService, val memberRepository: MemberRepository, val paymentRepository: PaymentRepository) {
	val client = OkHttpClient()

	@Value("\${dienst.url}")
	lateinit var dienstUrl: String

	@Value("\${dienst.token}")
	lateinit var dienstToken: String


	@GetMapping("/unhandled")
	fun getAllNotInLdb(): List<Member> {
		return this.memberService.getAllNotInLDB();
	}


	@GetMapping("/all")
	fun getAllMembers(): List<Member> {
		return this.memberService.getAllMembers();
	}


	@GetMapping("/dienst/{netid}")
	fun webHookEntryPoint(@PathVariable netid: String): ResponseEntity<*> {
		val member = memberService.getMemberByNetId(netid)
		val payment: Payment = paymentRepository.getByMember(member)

		val mediaType: MediaType = "application/json; charset=utf-8".toMediaTypeOrNull()!!
		val requestBody: okhttp3.RequestBody = DienstFormatter.toDienstFormat(member,payment).toRequestBody(mediaType)

		val request: Request = Request.Builder()
			.url("$dienstUrl/ldb/api/v3/people/")
			.addHeader("Authorization", "Token $dienstToken")
			.addHeader("Content-Type", "application/json")
			.post(requestBody)
			.build()

		val call: Call = client.newCall(request)
		val response: Response = call.execute()
		return if (response.code == 201) {
			member.addedToLdb = true
			memberRepository.saveAndFlush(member)
			ResponseEntityBuilder.createResponseEntity(HttpStatus.OK, "User successfully added to dienst ldb.");
		} else {
			ResponseEntityBuilder.createResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, response.body?.string() ?: "");
		}
	}
}

package com.wisv.ch.memberregistration.member.controller

import com.wisv.ch.memberregistration.member.model.Member
import com.wisv.ch.memberregistration.member.service.MemberRepository
import com.wisv.ch.memberregistration.member.service.MemberService
import com.wisv.ch.memberregistration.payment.model.Payment
import com.wisv.ch.memberregistration.payment.service.PaymentRepository
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
import org.springframework.web.bind.annotation.RequestBody

@RestController
@RequestMapping("/api/admin/members")
class MemberAdminRestController(val memberService: MemberService, val memberRepository: MemberRepository, val paymentRepository: PaymentRepository) {

	@GetMapping("/unhandled")
	fun getAllNotInLdb(): List<Member> {
		return this.memberService.getAllNotInLDB();
	}

	@GetMapping("/all")
	fun getAllMembers(): List<Member> {
		return this.memberService.getAllMembers();
	}

	@GetMapping("/dienst/{netid}")
	fun addMemberToDienst(@PathVariable netid: String): ResponseEntity<*> {
		val member = memberService.getMemberByNetId(netid)

		val response = memberService.addMemberToDienst(member)
		return if (response.code == 201) {
			member.addedToLdb = true
			memberRepository.saveAndFlush(member)
			ResponseEntityBuilder.createResponseEntity(HttpStatus.OK, "User successfully added to dienst ldb.");
		} else {
			ResponseEntityBuilder.createResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, response.body?.string() ?: "Unable to retrieve error message");
		}
	}

	@PutMapping("/put/{netid}")
	fun editExistingMember(@PathVariable netid: String, @RequestBody member: Member): ResponseEntity<*> {
		return if (netid == member.netid) {
			memberRepository.saveAndFlush(member)
			ResponseEntityBuilder.createResponseEntity(HttpStatus.OK, "User successfully edited!")
		} else {
			ResponseEntityBuilder.createResponseEntity(HttpStatus.BAD_REQUEST, "Tried to edit a different user than the given netid.")
		}
	}
}

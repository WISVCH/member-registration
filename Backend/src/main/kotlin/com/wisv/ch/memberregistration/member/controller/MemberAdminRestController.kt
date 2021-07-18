package com.wisv.ch.memberregistration.member.controller

import com.wisv.ch.memberregistration.member.model.Member
import com.wisv.ch.memberregistration.member.service.MemberRepository
import com.wisv.ch.memberregistration.member.service.MemberService
import com.wisv.ch.memberregistration.payment.service.PaymentRepository
import com.wisv.ch.memberregistration.utils.ResponseEntityBuilder
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.servlet.mvc.support.RedirectAttributes
import org.springframework.web.servlet.view.RedirectView

@RestController
@RequestMapping("/api/admin/members")
class MemberAdminRestController(val memberService: MemberService, val memberRepository: MemberRepository, val paymentRepository: PaymentRepository){

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

	@GetMapping("/login")
	fun loginRedirect(attributes: RedirectAttributes): RedirectView {
		return RedirectView("/register/admin/overview");
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

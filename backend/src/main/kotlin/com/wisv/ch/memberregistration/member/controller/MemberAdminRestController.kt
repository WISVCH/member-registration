package com.wisv.ch.memberregistration.member.controller

import com.wisv.ch.memberregistration.member.model.Member
import com.wisv.ch.memberregistration.member.service.MemberService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/admin/members")
class MemberAdminRestController(val memberService: MemberService) {

	@GetMapping("/unhandled")
	fun getAllNotInLdb(): List<Member> {
		return this.memberService.getAllNotInLDB();
	}
}

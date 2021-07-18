package com.wisv.ch.memberregistration.member.controller;

import com.wisv.ch.memberregistration.mail.MailService
import com.wisv.ch.memberregistration.member.model.Member;
import com.wisv.ch.memberregistration.member.service.MemberService;
import com.wisv.ch.memberregistration.utils.ResponseEntityBuilder.Companion.createResponseEntity
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
class MemberRestController(val memberService: MemberService, val mailService: MailService) {

	@PostMapping
	fun addMember(@Validated @RequestBody input : Member) : ResponseEntity<*> {
		memberService.addMember(input);
		mailService.sendFormConfirmation(input)
		return createResponseEntity(HttpStatus.OK, "User successfully added to database.");
	}
}

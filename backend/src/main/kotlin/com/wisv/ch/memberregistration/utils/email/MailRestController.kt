package com.wisv.ch.memberregistration.utils.email

import com.wisv.ch.memberregistration.utils.ResponseEntityBuilder.Companion.createResponseEntity
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/mail")
class MailRestController(val mailService: MailService) {
	@PostMapping("/registered")
	fun sendEmail(@Validated @RequestBody mailDTO: MailDTO) : ResponseEntity<*> {
		mailService.sendMail("test@test.nl", "Bram", mailDTO.subject, mailDTO.message)

		return createResponseEntity(HttpStatus.OK, "Mail successfully sent")
	}
}

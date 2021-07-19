package com.wisv.ch.memberregistration.webAppServe

import org.springframework.http.ResponseEntity

import org.springframework.http.HttpStatus

import javax.servlet.http.HttpServletResponse

import javax.servlet.http.HttpServletRequest

import org.springframework.web.bind.annotation.RequestMapping

import org.springframework.boot.web.servlet.error.ErrorController
import org.springframework.http.HttpMethod
import org.springframework.stereotype.Controller


@Controller
class SpaErrorController : ErrorController {
	@RequestMapping("/error")
	fun error(request: HttpServletRequest, response: HttpServletResponse): Any {
		// place your additional code here (such as error logging...)
		println("in the error controller")
		return if (request.method.equals(HttpMethod.GET.name, ignoreCase = true) && !request.requestURI.contains("api")) {
			response.status = HttpStatus.OK.value() // optional.
			"forward:/" // forward to static SPA html resource.
		} else {
			ResponseEntity.notFound().build<Any>() // or your REST 404 blabla...
		}
	}

	override fun getErrorPath(): String {
		return "/error"
	}
}

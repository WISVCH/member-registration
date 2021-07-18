package com.wisv.ch.memberregistration.error

import org.springframework.stereotype.Controller

import org.springframework.web.bind.annotation.RequestMapping


@Controller
class Html5PathsController {
	@RequestMapping(value = ["/{[path:[^\\{api}]*}"])
	fun redirect(): String {
		return "forward:/index.html"
	}
}

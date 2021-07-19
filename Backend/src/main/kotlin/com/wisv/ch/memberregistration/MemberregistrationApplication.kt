package com.wisv.ch.memberregistration

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry

@SpringBootApplication
class MemberregistrationApplication

fun main(args: Array<String>) {
	runApplication<MemberregistrationApplication>(*args)
}


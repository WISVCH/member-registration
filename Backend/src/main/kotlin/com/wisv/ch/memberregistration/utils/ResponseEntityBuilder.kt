package com.wisv.ch.memberregistration.utils;

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.time.LocalDateTime

class ResponseEntityBuilder {

	companion object {

		fun createResponseEntity(httpStatus: HttpStatus, message: String, content: Any? = null, httpHeaders: HttpHeaders? = null): ResponseEntity<*> {
			val responseBody = LinkedHashMap<String, Any>()

			responseBody.put("status", httpStatus.toString())
			responseBody.put("timestamp", LocalDateTime.now().toString())
			responseBody.put("message", message)

			if (content != null) {
				responseBody.put("content", content)
			}

			if (httpHeaders == null) {
				val httpHeaders = HttpHeaders()
				httpHeaders.set("Content-Type", "application/json")
			}

			return ResponseEntity(responseBody, httpHeaders, httpStatus)
		}
	}
}

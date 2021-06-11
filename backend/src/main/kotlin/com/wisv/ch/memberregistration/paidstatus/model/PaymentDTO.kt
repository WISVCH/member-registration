package com.wisv.ch.memberregistration.paidstatus.model

import lombok.AllArgsConstructor
import lombok.Getter

@Getter
@AllArgsConstructor
class PaymentDTO {
	val name: String = ""
	val email: String = ""
	val productKeys: List<String> = ArrayList()
	val returnUrl: String = ""
	val method: String = ""
}



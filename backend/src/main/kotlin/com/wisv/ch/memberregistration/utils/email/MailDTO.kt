package com.wisv.ch.memberregistration.utils.email

import lombok.Data


@Data
class MailDTO {

	var subject: String = ""
	var message: String = ""
}

package com.wisv.ch.memberregistration.mail

import com.wisv.ch.memberregistration.member.model.Member

interface MailService {

	/**
	 * Method that sends a confirmation of receiving the form
	 *
	 * @param member of type Member
	 */
	fun sendFormConfirmation(member: Member)
}

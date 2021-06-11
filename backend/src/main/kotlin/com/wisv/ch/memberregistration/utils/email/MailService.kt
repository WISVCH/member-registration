package com.wisv.ch.memberregistration.utils.email

interface MailService {
	fun sendMail(recipientEmail: String, recipientName: String, subject: String, message: String)

	fun sendVerificationEmail(recipientEmail: String, recipientName: String, subject: String, message: String, url: String)
}

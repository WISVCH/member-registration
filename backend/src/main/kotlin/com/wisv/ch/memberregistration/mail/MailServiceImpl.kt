package com.wisv.ch.memberregistration.mail

import com.wisv.ch.memberregistration.member.model.Member
import org.springframework.mail.MailException
import org.springframework.mail.MailPreparationException
import org.springframework.mail.MailSendException
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import org.thymeleaf.spring5.SpringTemplateEngine
import javax.mail.MessagingException

@Service
class MailServiceImpl(val mailSender: JavaMailSender, val templateEngine: SpringTemplateEngine) : MailService {

	override fun sendFormConfirmation(member: Member) {
		val subject = "Thank you ${member.firstname} for registering at CH!"
		this.sendMailWithContent(member.email, subject, "<div>Thank you for registering ${member.firstname}</div>")
	}

	/**
	 * Method to send a mail with custom subject and content to a recipient
	 *
	 * @param recipientEmail of type String
	 * @param subject		 of type String
	 * @param content 		 of type String
	 */
	private fun sendMailWithContent(recipientEmail: String, subject: String, content: String) {
		val mimeMessage = mailSender.createMimeMessage()
		val message : MimeMessageHelper

		try {
			message = MimeMessageHelper(mimeMessage, true, "UTF-8")
			message.setSubject("[CH member registration] $subject")
			message.setFrom("noreply@ch.tudelft.nl")
			message.setTo(recipientEmail)

			message.setText(content, true) // true = isHtml

			this.mailSender.send(mimeMessage)
		} catch (e: MessagingException) {
			throw MailPreparationException("Unable to prepare mail", e.cause!!)
		} catch (e: MailException) {
			throw MailSendException("Unable to send email", e.cause!!)
		}
	}
}

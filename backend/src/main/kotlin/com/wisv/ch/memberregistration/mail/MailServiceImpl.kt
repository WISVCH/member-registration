package com.wisv.ch.memberregistration.mail

import com.wisv.ch.memberregistration.member.model.Member
import org.springframework.mail.MailException
import org.springframework.mail.MailPreparationException
import org.springframework.mail.MailSendException
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import org.thymeleaf.context.Context
import org.thymeleaf.spring5.SpringTemplateEngine
import java.util.*
import javax.mail.MessagingException

@Service
class MailServiceImpl(val mailSender: JavaMailSender, val templateEngine: SpringTemplateEngine) : MailService {

	override fun sendFormConfirmation(member: Member) {
		val ctx = Context(Locale("en"))
		ctx.setVariable("name", member.firstname)
		ctx.setVariable("message", "Thank you for registering ${member.firstname}")
		val subject = "Thank you for registering at CH!"
		this.sendMailWithContent(member.email, subject, templateEngine.process("mailTemplate", ctx))
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

package com.wisv.ch.memberregistration.utils.email

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
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
class MailServiceImpl @Autowired constructor (private var mailSender: JavaMailSender, private var templateEngine: SpringTemplateEngine)  : MailService {

	@Value("\${ch.mail.sender}")
	var sender: String = ""

	private fun sendMailWithContent(recipientEmail: String, subject: String, content: String) {
		// Prepare message using a Spring helper
		val mimeMessage = mailSender.createMimeMessage()
		val message: MimeMessageHelper
		try {
			message = MimeMessageHelper(mimeMessage, true, "UTF-8")
			message.setSubject(subject)
			message.setFrom(sender)
			message.setTo(recipientEmail)

			// Create the HTML body using Thymeleaf
			message.setText(content, true) // true = isHtml

			// Send mail
			mailSender.send(mimeMessage)
		} catch (e: MessagingException) {
			throw MailPreparationException("Unable to prepare email", e.cause!!)
		} catch (m: MailException) {
			throw MailSendException("Unable to send email", m.cause)
		}
	}

	override fun sendMail(recipientEmail: String, recipientName: String, subject: String, message: String) {
		val htmlContent = prepareHtmlContent(recipientName, message)
		sendMailWithContent(recipientEmail, subject, htmlContent)
	}

	override fun sendVerificationEmail(recipientEmail: String, recipientName: String, subject: String, message: String, url: String) {
		TODO("Not yet implemented")
	}

	private fun prepareHtmlContent(name: String, message: String): String {
		// Prepare the evaluation context
		val ctx = Context(Locale("en"))
		ctx.setVariable("name", name)
		ctx.setVariable("message", message)
		return this.templateEngine.process("mailTemplate", ctx)
	}
}

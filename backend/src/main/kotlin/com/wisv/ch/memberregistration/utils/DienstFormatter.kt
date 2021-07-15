package com.wisv.ch.memberregistration.utils

import com.wisv.ch.memberregistration.member.model.Member
import com.wisv.ch.memberregistration.paidstatus.model.Payment
import org.springframework.boot.configurationprocessor.json.JSONObject
import java.text.SimpleDateFormat
import java.util.*

class DienstFormatter {
	companion object {
		private fun getPriceByProductKey(key: String): Int {
			return when (key) {
				"0bba7e47-db2e-4dd8-9eac-8cceeb9a1ebf" -> 25
				"7b495ae1-c413-405f-b7ee-7758b8cdfb99" -> 20
				"b7c4ba93-7145-4042-8027-21c35443d8ce" -> 15
				"5946f684-67c0-4da4-9096-b58b1db17389" -> 10
				else -> 1
			}
		}

		fun toDienstFormat(member: Member, payment: Payment): String {
			val formatter = SimpleDateFormat("YYYY-MM-dd")
			val pricePayed: Int = getPriceByProductKey(payment.product)

			val dateFrom = Calendar.getInstance()
			val dateTo = Calendar.getInstance()
			dateTo.add(Calendar.YEAR, pricePayed / 5)

			val studentJSONObject = JSONObject()
				.put("emergency_name", member.emergencyName)
				.put("emergency_phone", member.emergencyPhone)
				.put("study", member.study)
				.put("student_number", member.studentNumber)

			val employeeJSONObject = JSONObject()
				.put("faculty", "EEMCS")
				.put("department", "student")
				.put("function", "student")
				.put("phone_internal", "0000")

			val memberJSONObject = JSONObject()
				.put("date_from", formatter.format(dateFrom.time))
				.put("date_to", formatter.format(dateTo.time))
				.put("date_paid", formatter.format(member.paidDate.time))
				.put("first_year", member.studyYear)
				.put("amount_paid", pricePayed)

			return JSONObject()
				.put("initials", member.initials)
				.put("firstname", member.firstname)
				.put("preposition", member.preposition)
				.put("surname", member.surname)
				.put("gender", member.gender[0])
				.put("birthdate", formatter.format(member.birthdate))
				.put("street_name", member.streetName)
				.put("house_number", member.houseNumber)
				.put("postcode", member.postCode)
				.put("city", member.city)
				.put("country", member.country)
				.put("email", member.email)
				.put("phone_mobile", member.phoneMobile)
				.put("netid", member.netid)
				.put("revision_comment", "Inserted by member registration tool")
				.put("alumnus", JSONObject())
				.put("member", memberJSONObject)
				.put("employee", employeeJSONObject)
				.put("student", studentJSONObject)
				.put("mail_announcements", member.mailActivity.toInt())
				.put("mail_company", member.mailCareer.toInt())
				.put("mail_education", member.mailEducation.toInt())
				.put("machazine", member.machazine.toInt())
				.toString()
		}
		private fun Boolean.toInt() = if (this) 1 else 0
	}

}

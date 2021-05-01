package com.wisv.ch.memberregistration.member.model

import com.wisv.ch.memberregistration.paidstatus.model.PaidStatus
import com.wisv.ch.memberregistration.study.model.Study
import lombok.Data
import lombok.NoArgsConstructor
import java.time.Instant
import java.util.*
import javax.persistence.*

//    "id" SERIAL UNIQUE PRIMARY KEY,
//    "gender" varchar NOT NULL,
//    "first_name" varchar NOT NULL,
//    "last_name" varchar NOT NULL,
//    "email" varchar UNIQUE NOT NULL,
//    "phone_number" varchar NOT NULL,
//    "street" varchar NOT NULL,
//    "street_number" varchar NOT NULL,
//    "postal_code" varchar NOT NULL,
//    "place" varchar NOT NULL,
//    "country" varchar NOT NULL,
//    "letters" varchar NOT NULL,
//    "netid" varchar UNIQUE NOT NULL,
//    "yearbook_permission" boolean NOT NULL DEFAULT false,
//    "activity_mailing" boolean NOT NULL DEFAULT false,
//    "career_mailing" boolean NOT NULL DEFAULT false,
//    "education_mailing" boolean NOT NULL DEFAULT false,
//    "machazine" boolean NOT NULL DEFAULT false,
//    "added_to_ldb" boolean NOT NULL DEFAULT false,
//    "paid_status" varchar,
//    "amount_paid" decimal NOT NULL DEFAULT 0.0,
//    "created_at" timestamp NOT NULL DEFAULT (now())

// initials, first name, tussenvoegsel (opt), achternaam, geslacht, geboortedatum, straat, huisnummer, postcode, stad, land, email, telephone number,
// study, student number, netid, emergency_contact ( name and number), activity, career and education mailing, machazine, added_to_ldb, paid, paid_date, member_since, member_till (member_since + 5),

@Entity
@Data
@NoArgsConstructor
@Table
class Member {

	@Id
	@GeneratedValue
	var id: Long = 0

	var initials: String = ""
	var firstName: String = ""
	var surNamePreFix: String = ""
	var lastName: String = ""
	var gender: String = ""
	var birthDate: Date = Date.from(Instant.now())
	var street: String = ""
	var houseNumber: String = ""
	var postalCode: String = ""
	var city: String = ""
	var country: String = ""
	var email: String = ""
	var emailConfirmed: Boolean = false
	var telephoneNumber: String = ""
	var study: Study = Study.BACHELOR_MATHEMATICS
	var studentNumber: Int = 0 // You can mail a student with this information by using <studynumber>@studienummer.tudelft.nl as template
	var netID: String = ""
	var emergencyContactName: String = ""
	var emergencyContactNumber: String = ""
	var activityMail: Boolean = false
	var careerMail: Boolean = false
	var educationMail: Boolean = false
	var machazine: Boolean = false
	var addedToLdb: Boolean = false
	var paidStatus: PaidStatus = PaidStatus.WAITING
	var paidDate: Date = Date.from(Instant.now())
}

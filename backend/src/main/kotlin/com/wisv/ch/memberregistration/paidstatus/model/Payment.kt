package com.wisv.ch.memberregistration.paidstatus.model

import com.wisv.ch.memberregistration.member.model.Member
import lombok.Data
import lombok.NoArgsConstructor
import javax.persistence.*

@Entity
@Data
@NoArgsConstructor
@Table
class Payment {

	@Id
	@GeneratedValue
	var id: Long = 0

	@ManyToOne(optional = false)
	lateinit var member: Member

	var publicReference: String = ""
	var paymentStatus: String = ""
	var product: String = ""
}

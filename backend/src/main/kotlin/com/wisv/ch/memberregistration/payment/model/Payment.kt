package com.wisv.ch.memberregistration.payment.model

import com.wisv.ch.memberregistration.member.model.Member
import lombok.Data
import lombok.NoArgsConstructor
import javax.persistence.*

@Entity
@Data
@NoArgsConstructor
@Table
class Payment {
	constructor(){

	}

	constructor(member: Member, publicReference: String, paymentStatus: PaidStatus, product: String) {
		this.member = member
		this.publicReference = publicReference
		this.paymentStatus = paymentStatus
		this.product = product
	}

	@Id
	@GeneratedValue
	var id: Long = 0

	@ManyToOne(optional = false)
	lateinit var member: Member

	var publicReference: String = ""
	var paymentStatus: PaidStatus = PaidStatus.CANCELLED
	var product: String = ""
}

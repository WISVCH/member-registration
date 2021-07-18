package com.wisv.ch.memberregistration.payment.service

import com.wisv.ch.memberregistration.member.model.Member
import com.wisv.ch.memberregistration.payment.model.Payment
import org.springframework.data.jpa.repository.JpaRepository

interface PaymentRepository : JpaRepository<Payment, Long> {

	fun getByPublicReference(publicReference: String): Payment

	fun getByMember(member: Member): Payment
}

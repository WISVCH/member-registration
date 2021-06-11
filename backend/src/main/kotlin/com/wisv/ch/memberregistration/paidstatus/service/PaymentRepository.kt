package com.wisv.ch.memberregistration.paidstatus.service

import com.wisv.ch.memberregistration.paidstatus.model.Payment
import org.springframework.data.jpa.repository.JpaRepository

interface PaymentRepository : JpaRepository<Payment, Long> {

	fun getByPublicReference(publicReference: String): Payment
}

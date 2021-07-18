package com.wisv.ch.memberregistration.member.service

import com.wisv.ch.memberregistration.member.model.Member
import com.wisv.ch.memberregistration.payment.model.PaidStatus
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MemberRepository : JpaRepository<Member, Long>{
	fun findAllByPaidStatus(paidStatus: PaidStatus): List<Member>

	fun findAllByAddedToLdbAndPaidStatus(addedToLdb: Boolean, paidStatus: PaidStatus): List<Member>

	fun findByEmail(email: String): Member

	fun findByNetid(netid: String): Member

}

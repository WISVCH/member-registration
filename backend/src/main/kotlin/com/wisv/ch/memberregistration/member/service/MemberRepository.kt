package com.wisv.ch.memberregistration.member.service

import com.wisv.ch.memberregistration.member.model.Member
import com.wisv.ch.memberregistration.paidstatus.model.PaidStatus
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MemberRepository : JpaRepository<Member, Long>{
	fun findAllByPaidStatus(paidStatus: PaidStatus): List<Member>

	fun findAllByAddedToLdb(addedToLdb: Boolean): List<Member>

	fun findMemberByEmail(email: String): Member
}

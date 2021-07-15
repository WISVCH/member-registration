package com.wisv.ch.memberregistration.member.service;

import com.wisv.ch.memberregistration.exception.AlreadyInDienstException;
import com.wisv.ch.memberregistration.member.model.Member;
import com.wisv.ch.memberregistration.paidstatus.model.PaidStatus
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service;

@Service
class MemberServiceImpl(val memberRepository: MemberRepository) : MemberService {

	private fun verifyDienst(member : Member) : Boolean {
		return true
	}

	override fun getAllNotInLDB(): List<Member> {
		return memberRepository.findAllByAddedToLdbAndPaidStatus(false, PaidStatus.PAID);
	}

	override fun addMember(member: Member) {
		if (verifyDienst(member)) {
			memberRepository.saveAndFlush(member);
		} else {
			throw AlreadyInDienstException(member);
		}
	}

	override fun getMemberByEmail(email: String): Member {
		return memberRepository.findByEmail(email)
	}

	override fun getAllMembers(): List<Member> {
		return memberRepository.findAll()
	}

	override fun getMemberByNetId(netid: String): Member {
		return memberRepository.findByNetid(netid)
	}
}

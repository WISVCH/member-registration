package com.wisv.ch.memberregistration.member.service;

import com.wisv.ch.memberregistration.exception.AlreadyInDienstException;
import com.wisv.ch.memberregistration.member.model.Member;
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service;

@Service
class MemberServiceImpl(val memberRepository: MemberRepository) : MemberService {

	private fun verifyDienst(member : Member) : Boolean {
		return true;
	}

	override fun getAllNotInLDB(): List<Member> {
		return memberRepository.findAllByAddedToLdb(false);
	}

	override fun addMember(member: Member) {
		if (verifyDienst(member)) {
			memberRepository.save(member);
		} else {
			throw AlreadyInDienstException(member);
		}
	}

	override fun getMemberByEmail(email: String): Member {
		return memberRepository.findByEmail(email)
	}

	override fun getAllMembers(page: Int, pageSize: Int): List<Member> {
		return memberRepository.findAll(PageRequest.of(page,pageSize)).content
	}
}

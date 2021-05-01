package com.wisv.ch.memberregistration.member.service;

import com.wisv.ch.memberregistration.exception.AlreadyInDienstException;
import com.wisv.ch.memberregistration.member.model.Member;
import org.springframework.stereotype.Service;

@Service
class MemberServiceImpl(val memberRepository: MemberRepository) : MemberService {

	private fun verifyDients(member : Member) : Boolean {
		return true;
	}

	override fun getAllNotInLDB(): List<Member> {
		return memberRepository.findAllByAddedToLdb(false);
	}

	override fun addMember(member: Member) {
		if (verifyDients(member)) {
			memberRepository.save(member);
		} else {
			throw AlreadyInDienstException(member);
		}
	}
}

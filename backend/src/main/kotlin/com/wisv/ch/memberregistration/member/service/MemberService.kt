package com.wisv.ch.memberregistration.member.service;

import com.wisv.ch.memberregistration.member.model.Member;

interface MemberService {
	fun getAllNotInLDB(): List<Member>

	fun addMember(member: Member)
}

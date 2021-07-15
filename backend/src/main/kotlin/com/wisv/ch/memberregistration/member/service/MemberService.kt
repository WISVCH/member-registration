package com.wisv.ch.memberregistration.member.service;

import com.wisv.ch.memberregistration.member.model.Member;

interface MemberService {
	fun getAllNotInLDB(): List<Member>

	fun addMember(member: Member)

	fun getMemberByEmail(email: String): Member

	fun getAllMembers(page: Int, pageSize: Int): List<Member>
}

package com.wisv.ch.memberregistration.member.service;

import com.wisv.ch.memberregistration.member.model.Member;
import okhttp3.Response

interface MemberService {
	fun getAllNotInLDB(): List<Member>

	fun addMember(member: Member)

	fun getMemberByEmail(email: String): Member

	fun getMemberByNetId(netid: String): Member

	fun getAllMembers(): List<Member>

	fun addMemberToDienst(member: Member): Response

}

package com.wisv.ch.memberregistration.member.service;

import com.wisv.ch.memberregistration.exception.AlreadyInDienstException;
import com.wisv.ch.memberregistration.member.model.Member;
import com.wisv.ch.memberregistration.payment.model.PaidStatus
import com.wisv.ch.memberregistration.payment.model.Payment
import com.wisv.ch.memberregistration.payment.service.PaymentRepository
import com.wisv.ch.memberregistration.utils.DienstFormatter
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service;

@Service
class MemberServiceImpl(val memberRepository: MemberRepository, val paymentRepository: PaymentRepository) : MemberService {
	val client = OkHttpClient()

	@Value("\${dienst.url}")
	lateinit var dienstUrl: String

	@Value("\${dienst.token}")
	lateinit var dienstToken: String


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

	override fun addMemberToDienst(member: Member): Response {
		val payment = paymentRepository.getByMember(member)

		val mediaType: MediaType = "application/json; charset=utf-8".toMediaTypeOrNull()!!
		val requestBody: RequestBody = DienstFormatter.toDienstFormat(member,payment).toRequestBody(mediaType)

		val request: Request = Request.Builder()
			.url("$dienstUrl/ldb/api/v3/people/")
			.addHeader("Authorization", "Token $dienstToken")
			.addHeader("Content-Type", "application/json")
			.post(requestBody)
			.build()

		val call: Call = client.newCall(request)
		return call.execute()
	}
}

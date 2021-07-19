package com.wisv.ch.memberregistration.member

import com.wisv.ch.memberregistration.ServiceTest
import com.wisv.ch.memberregistration.Util
import com.wisv.ch.memberregistration.member.model.Member
import com.wisv.ch.memberregistration.member.service.MemberRepository
import com.wisv.ch.memberregistration.member.service.MemberServiceImpl
import com.wisv.ch.memberregistration.payment.service.PaymentRepository
import org.junit.After
import org.junit.Before
import org.mockito.Mock

class MemberServiceImplTest : ServiceTest() {
	@Mock
	private lateinit var memberRepository: MemberRepository

	@Mock
	private lateinit var paymentRepository: PaymentRepository

	private var memberServiceImpl: MemberServiceImpl? = null

	private var member: Member? = null

	@Before
	fun setUp() {
		memberServiceImpl = MemberServiceImpl(memberRepository, paymentRepository)
		member = Util.member1
	}

	@After
	fun tearDown() {
		memberServiceImpl = null
	}



}

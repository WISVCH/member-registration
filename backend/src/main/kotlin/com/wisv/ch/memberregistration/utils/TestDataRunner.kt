package com.wisv.ch.memberregistration.utils

import com.wisv.ch.memberregistration.member.model.Member
import com.wisv.ch.memberregistration.member.service.MemberRepository
import com.wisv.ch.memberregistration.paidstatus.model.PaidStatus
import com.wisv.ch.memberregistration.paidstatus.model.Payment
import com.wisv.ch.memberregistration.paidstatus.service.PaymentRepository
import com.wisv.ch.memberregistration.study.model.Study
import org.springframework.boot.context.event.ApplicationStartedEvent
import org.springframework.context.annotation.Profile
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component
import java.time.Instant
import java.util.*

@Component
@Profile("dev")
class TestDataRunner(val memberRepository: MemberRepository, val paymentRepository: PaymentRepository) {

	@EventListener
	fun onStartEvent(event: ApplicationStartedEvent) {
		val bram = Member("B.T.", "Bram", "van", "Kooten", "Male", Date.from(Instant.now()), "Mekelweg", "4", "2628CD", "Delft", "NL", "secretaris@ch.tudelft.nl", false, "0152782532", Study.BACHELOR_COMPUTER_SCIENCE, 2016,1111111, "bvankooten")
		bram.paidStatus = PaidStatus.PAID
		memberRepository.save(bram)
		memberRepository.save(Member("C", "Christiaan", "", "Huygens", "Male", Date.from(Instant.now()), "Mekelweg", "4", "2628CD", "Delft", "NL", "secretaris@ch.tudelft.nl", false, "0152782532", Study.BACHELOR_COMPUTER_SCIENCE, 2017,2222222, "chuygens"))
		memberRepository.save(Member("J.M.C.", "Julian", "van", "Dijk", "Male", Date.from(Instant.now()), "Mekelweg", "4", "2628CD", "Delft", "NL", "secretaris@ch.tudelft.nl", false, "0152782532", Study.BACHELOR_COMPUTER_SCIENCE, 2017,3333333, "jmcvandijk"))
		paymentRepository.save(Payment(bram, "reference",PaidStatus.PAID, "0bba7e47-db2e-4dd8-9eac-8cceeb9a1ebf"))
	}

}

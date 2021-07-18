package com.wisv.ch.memberregistration

import com.wisv.ch.memberregistration.member.model.Member
import com.wisv.ch.memberregistration.study.model.Study
import java.time.Instant
import java.util.*

class Util {
	companion object {
		val member1 = Member("B.T.", "Bram", "van", "Kooten", "Male", Date.from(Instant.now()), "Mekelweg", "4", "2628CD", "Delft", "NL", "secretaris@ch.tudelft.nl", false, "0152782532", Study.BACHELOR_COMPUTER_SCIENCE, 2016,1111111, "bvankooten")
		val member2 = Member("C", "Christiaan", "", "Huygens", "Male", Date.from(Instant.now()), "Mekelweg", "4", "2628CD", "Delft", "NL", "secretaris@ch.tudelft.nl", false, "0152782532", Study.BACHELOR_COMPUTER_SCIENCE, 2017,2222222, "chuygens")
		val member3 = Member("J.M.C.", "Julian", "van", "Dijk", "Male", Date.from(Instant.now()), "Mekelweg", "4", "2628CD", "Delft", "NL", "secretaris@ch.tudelft.nl", false, "0152782532", Study.BACHELOR_COMPUTER_SCIENCE, 2017,3333333, "jmcvandijk")
	}
}

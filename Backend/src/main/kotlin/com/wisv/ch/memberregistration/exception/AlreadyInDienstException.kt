package com.wisv.ch.memberregistration.exception;

import com.wisv.ch.memberregistration.member.model.Member;

class AlreadyInDienstException(member: Member) : RuntimeException("Member already exists with student number '" + member.studentNumber + "'.") {
}

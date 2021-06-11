package com.wisv.ch.memberregistration.paidstatus.model

enum class PaidStatus {
	CREATED, WAITING, PAID, EXPIRED, CANCELLED;

	companion object {
		fun fromString(value: String) = PaidStatus.values().first { it.toString() == value }
	}
}

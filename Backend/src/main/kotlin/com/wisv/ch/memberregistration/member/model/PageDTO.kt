package com.wisv.ch.memberregistration.member.model

import lombok.AllArgsConstructor
import lombok.Getter

@Getter
@AllArgsConstructor
class PageDTO {
	val page: Int = 0
	val pageSize: Int = 10
}

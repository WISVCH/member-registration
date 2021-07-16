package com.wisv.ch.memberregistration

import org.junit.Rule
import org.junit.rules.ExpectedException
import org.junit.runner.RunWith
import org.springframework.test.context.ActiveProfiles
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner


@RunWith(SpringJUnit4ClassRunner::class)
@SpringBootTest(classes = [MemberregistrationApplicationTests::class], webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
abstract class ServiceTest {
	/**
	 * ExpectedException Object
	 */
	@Rule
	var thrown: ExpectedException = ExpectedException.none()
}

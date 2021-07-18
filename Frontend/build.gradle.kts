plugins{
	id("com.moowork.node")
	id("base")
}

tasks.withType<org.springframework.boot.gradle.tasks.bundling.BootJar> {
	enabled = false
}

tasks.withType<Jar> {
	enabled = true
}

val yarnInstall by tasks.registering(com.moowork.gradle.node.yarn.YarnTask::class) {
}

val yarnBuild by tasks.registering(com.moowork.gradle.node.yarn.YarnTask::class) {
	dependsOn(yarnInstall)
	args = listOf("build")
}

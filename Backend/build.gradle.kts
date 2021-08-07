import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot")
	id("io.spring.dependency-management")
	kotlin("jvm") version "1.4.32"
	kotlin("plugin.spring") version "1.4.32"
	kotlin("plugin.jpa") version "1.4.32"
}

group = "com.wisv.ch"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
	jcenter()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-actuator")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-mail")
	implementation("org.springframework.boot:spring-boot-starter-oauth2-client")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
	implementation("org.springframework.boot:spring-boot-starter-web")

	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

	implementation("org.thymeleaf.extras:thymeleaf-extras-springsecurity5")
	implementation("com.squareup.okhttp3:okhttp:4.9.1")
	implementation("junit:junit:4.12")

	compileOnly("org.projectlombok:lombok")
	compileOnly("org.flywaydb:flyway-core:4.2.0")
	
	developmentOnly("org.springframework.boot:spring-boot-devtools")

	runtimeOnly("com.h2database:h2")
	runtimeOnly("org.postgresql:postgresql")
	runtimeOnly(project(":Frontend"))

	implementation("org.springframework.boot:spring-boot-configuration-processor")
	annotationProcessor("org.projectlombok:lombok")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")

	testImplementation("org.junit.jupiter:junit-jupiter-api:5.3.1")
	testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.3.1")
}

val copyWebApp by tasks.registering(Copy::class) {
	from("$rootDir/Frontend/build/")
	into("$rootDir/Backend/src/main/resources/static/")
}

tasks.withType<KotlinCompile> {
	dependsOn(":Frontend:yarnBuild")
	dependsOn(copyWebApp)
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "11"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.withType<org.springframework.boot.gradle.tasks.bundling.BootJar> {
	dependsOn(copyWebApp)
	val basename ="member-registration"
	val version = if (project.hasProperty("buildNumber")) {
		"${project.property("buildNumber")}"
	} else {
		"SNAPSHOT"
	}
	this.archiveFileName.set("${basename}.jar")

	manifest {
		attributes["Implementation-Title"] = "Member Registration"
		attributes["Implementation-Version"] = version
	}
}

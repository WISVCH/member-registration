allprojects {
	repositories {
		mavenCentral()
	}
}

buildscript {
	repositories {
		maven {
			url = uri("https://plugins.gradle.org/m2/")
		}
	}

	dependencies {
		classpath("com.moowork.gradle","gradle-node-plugin","1.3.1")
		classpath("io.spring.gradle","dependency-management-plugin","1.0.11.RELEASE")
		classpath ("org.springframework.boot","spring-boot-gradle-plugin","2.4.5")
	}
}

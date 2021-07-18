
import org.hibernate.id.Configurable
import org.springframework.boot.web.server.ConfigurableWebServerFactory
import org.springframework.boot.web.server.ErrorPage
import org.springframework.boot.web.server.WebServerFactoryCustomizer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus

import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory

import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
class WebAppServeAdvice : WebMvcConfigurer {
	override fun addViewControllers(registry: ViewControllerRegistry) {
		registry.addViewController("/error").setViewName("forward:/index.html")
	}

	@Bean
	fun containerCustomizer(): WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {
		return WebServerFactoryCustomizer { container: ConfigurableServletWebServerFactory ->
			container.addErrorPages(
				ErrorPage(
					HttpStatus.NOT_FOUND,
					"/notFound"
				)
			)
		}
	}
}

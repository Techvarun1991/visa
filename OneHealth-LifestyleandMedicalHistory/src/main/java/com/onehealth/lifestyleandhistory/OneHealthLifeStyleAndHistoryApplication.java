package com.onehealth.lifestyleandhistory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@RestController
public class OneHealthLifeStyleAndHistoryApplication {

	// Initialize a logger for this class
	private static final Logger logger = LoggerFactory.getLogger(OneHealthLifeStyleAndHistoryApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(OneHealthLifeStyleAndHistoryApplication.class, args);

		// Log a startup message
		logger.info("OneHealth LifeStyle and History Microservice is starting...");
	}

	/**
	 * Handles a GET request to the root endpoint.
	 *
	 * @return A welcome message.
	 */
	@GetMapping
	public String Welcome() {
		return "Welcome From OneHealth Team (OneHealth-LifeStyleAndHistory)...Jenkin Pipeline";
	}

	/**
	 * Bean configuration to create a RestTemplate instance.
	 *
	 * @return A RestTemplate instance.
	 */
	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}

}

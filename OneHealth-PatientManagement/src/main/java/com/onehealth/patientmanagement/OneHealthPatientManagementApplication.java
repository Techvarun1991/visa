package com.onehealth.patientmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@RestController
public class OneHealthPatientManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(OneHealthPatientManagementApplication.class, args);
	}
	
//	@GetMapping
//	public String Welcome() {
//		
//		return "Welcome From OneHealth Team (OneHealth-PatientManagement)!!!";
//	}
	
	@Bean
	public RestTemplate getRestTemplate() {
	return new RestTemplate();
	}
	 @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }

}

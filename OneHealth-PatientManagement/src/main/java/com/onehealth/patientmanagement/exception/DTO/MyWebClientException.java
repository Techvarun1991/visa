package com.onehealth.patientmanagement.exception.DTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.reactive.function.client.WebClientException;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class MyWebClientException extends WebClientException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	// Constructor with a message
    public MyWebClientException(String message) {
        super(message);
    }

    // Constructor with a message and a cause
    public MyWebClientException(String message, Throwable cause) {
        super(message, cause);
    }

    // Additional methods or overrides can be added as needed
}

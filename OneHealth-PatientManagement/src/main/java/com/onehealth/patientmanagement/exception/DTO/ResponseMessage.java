package com.onehealth.patientmanagement.exception.DTO;

public class ResponseMessage<T> {
	private String message;
	private T data;

	public ResponseMessage(String message, T data) {
		this.message = message;
		this.data = data;
	}

	public ResponseMessage() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "ResponseMessage [message=" + message + ", data=" + data + "]";
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	// Getters and setters as needed.

}
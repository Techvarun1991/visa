package com.onehealth.patientmanagement.exception.DTO;

public class CreateUserRequestDto {

    private String mobileNumber;

    private String emailId;

    private String firstName;

    private String lastName;
    
    private String password;

	@Override
	public String toString() {
		return "CreateUserRequestDto [mobileNumber=" + mobileNumber + ", emailId=" + emailId + ", firstName="
				+ firstName + ", lastName=" + lastName + ", password=" + password + "]";
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public CreateUserRequestDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CreateUserRequestDto(String mobileNumber, String emailId, String firstName, String lastName,
			String password) {
		super();
		this.mobileNumber = mobileNumber;
		this.emailId = emailId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
	}
    
    
	
}

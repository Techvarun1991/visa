package com.onehealth.patientmanagement.exception.DTO;

public class ChangePasswordRequest {
	private String oldPassword;
    private String newPassword;
	public ChangePasswordRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ChangePasswordRequest(String oldPassword, String newPassword) {
		super();
		this.oldPassword = oldPassword;
		this.newPassword = newPassword;
	}
	@Override
	public String toString() {
		return "ChangePasswordRequest [oldPassword=" + oldPassword + ", newPassword=" + newPassword + "]";
	}
	public String getOldPassword() {
		return oldPassword;
	}
	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
    
    
    
}

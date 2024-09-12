package com.onehealth.patientmanagement.entity;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.mindrot.jbcrypt.BCrypt;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Transient;

@Entity
public class GeneralUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String mobileNumber;

    private String emailId;

    private String firstName;

    private String lastName;
    
    private Boolean isEnabled; 
    
    private String password;

    @OneToMany(mappedBy = "generalUser", fetch = FetchType.EAGER, cascade = { CascadeType.ALL, CascadeType.PERSIST,
            CascadeType.MERGE, CascadeType.REMOVE })
    @JsonManagedReference
    private Set<PatientProfile> patientProfiles = new HashSet<>();

	public GeneralUser() {
		super();
		// TODO Auto-generated constructor stub
	}

	public GeneralUser(Long userId, String mobileNumber, String emailId, String firstName, String lastName,
			Boolean isEnabled, String password, Set<PatientProfile> patientProfiles) {
		super();
		this.userId = userId;
		this.mobileNumber = mobileNumber;
		this.emailId = emailId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.isEnabled = isEnabled;
		this.password = password;
		this.patientProfiles = patientProfiles;
	}

	@Override
	public String toString() {
		return "GeneralUser [userId=" + userId + ", mobileNumber=" + mobileNumber + ", emailId=" + emailId
				+ ", firstName=" + firstName + ", lastName=" + lastName + ", isEnabled=" + isEnabled + ", password="
				+ password + ", patientProfiles=" + patientProfiles + "]";
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
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

	public Boolean getIsEnabled() {
		return isEnabled;
	}

	public void setIsEnabled(Boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<PatientProfile> getPatientProfiles() {
		return patientProfiles;
	}

	public void setPatientProfiles(Set<PatientProfile> patientProfiles) {
		this.patientProfiles = patientProfiles;
	}

  
	@PrePersist	
	public void encryptPassword() {
		if (password != null) {
			this.password = BCrypt.hashpw(password, BCrypt.gensalt());
		}
	}
}













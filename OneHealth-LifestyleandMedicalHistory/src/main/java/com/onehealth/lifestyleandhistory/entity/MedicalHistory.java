package com.onehealth.lifestyleandhistory.entity;

import jakarta.persistence.*;

@Entity
/**
 * The `MedicalHistory` class represents the medical history records of a patient.
 */
//@Table(name = "pastmedicalrecords")
//@SequenceGenerator(name = "mh",sequenceName = "mhh",initialValue = 5000)
public class MedicalHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /** The unique ID of the medical history record. */
    private Long recordId;

    @Column(name = "allergies")
    /** Any allergies the patient has. */
    private String allergies;

    @Column(name = "currentmedication")
    /** Current medications being taken by the patient. */
    private String currentMedication;

    @Column(name = "pastmedication")
    /** Past medications taken by the patient. */
    private String pastMedication;

    @Column(name = "chronicdiseases")
    /** Chronic diseases or conditions the patient has. */
    private String chronicDiseases;

    @Column(name = "injuries")
    /** Previous injuries experienced by the patient. */
    private String injuries;

    @Column(name = "surgeries")
    /** Surgeries undergone by the patient. */
    private String surgeries;

    @Column(name = "patientid", nullable = false)
    /** The ID of the patient associated with the medical history record. */
    private int patientId;

    @Column(name = "user_id", nullable = false)
    /** The ID of the user associated with the medical history record. */
    private Long userId;

	public MedicalHistory() {
		super();
		// TODO Auto-generated constructor stub
	}

	public MedicalHistory(Long recordId, String allergies, String currentMedication, String pastMedication,
			String chronicDiseases, String injuries, String surgeries, int patientId, Long userId) {
		super();
		this.recordId = recordId;
		this.allergies = allergies;
		this.currentMedication = currentMedication;
		this.pastMedication = pastMedication;
		this.chronicDiseases = chronicDiseases;
		this.injuries = injuries;
		this.surgeries = surgeries;
		this.patientId = patientId;
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "MedicalHistory [recordId=" + recordId + ", allergies=" + allergies + ", currentMedication="
				+ currentMedication + ", pastMedication=" + pastMedication + ", chronicDiseases=" + chronicDiseases
				+ ", injuries=" + injuries + ", surgeries=" + surgeries + ", patientId=" + patientId + ", userId="
				+ userId + "]";
	}

	public Long getRecordId() {
		return recordId;
	}

	public void setRecordId(Long recordId) {
		this.recordId = recordId;
	}

	public String getAllergies() {
		return allergies;
	}

	public void setAllergies(String allergies) {
		this.allergies = allergies;
	}

	public String getCurrentMedication() {
		return currentMedication;
	}

	public void setCurrentMedication(String currentMedication) {
		this.currentMedication = currentMedication;
	}

	public String getPastMedication() {
		return pastMedication;
	}

	public void setPastMedication(String pastMedication) {
		this.pastMedication = pastMedication;
	}

	public String getChronicDiseases() {
		return chronicDiseases;
	}

	public void setChronicDiseases(String chronicDiseases) {
		this.chronicDiseases = chronicDiseases;
	}

	public String getInjuries() {
		return injuries;
	}

	public void setInjuries(String injuries) {
		this.injuries = injuries;
	}

	public String getSurgeries() {
		return surgeries;
	}

	public void setSurgeries(String surgeries) {
		this.surgeries = surgeries;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	

	
    
}

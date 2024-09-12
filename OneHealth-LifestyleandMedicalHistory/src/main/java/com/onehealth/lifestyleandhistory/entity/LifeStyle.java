package com.onehealth.lifestyleandhistory.entity;

import jakarta.persistence.*;

@Entity
/**
 * The `LifeStyle` class represents the lifestyle information of a patient.
 */
public class LifeStyle {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "lifestyleId")
	/** The unique ID of the lifestyle entry. */
	private Long lifestyleId;

	@Column(name = "smoke", length = 255, nullable = false)
	/** The smoking habits of the patient. */
	private String smoke;

	@Column(name = "alcohol")
	/** The alcohol consumption habits of the patient. */
	private String alcohol;

	@Column(name = "exercise")
	/** The exercise routine of the patient. */
	private String exercise;

	@Column(name = "food_preferences")
	/** The food preferences of the patient. */
	private String foodPreferences;

	@Column(name = "occupation")
	/** The occupation of the patient. */
	private String occupation;

	@Column(name = "patient_id", nullable = false)
	/** The ID of the patient associated with the lifestyle entry. */
	private int patientId;

	@Column(name = "user_Id", nullable = false)
	/** The ID of the user associated with the lifestyle entry. */
	private Long userId;

	public LifeStyle() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LifeStyle(Long lifestyleId, String smoke, String alcohol, String exercise, String foodPreferences,
			String occupation, int patientId, Long userId) {
		super();
		this.lifestyleId = lifestyleId;
		this.smoke = smoke;
		this.alcohol = alcohol;
		this.exercise = exercise;
		this.foodPreferences = foodPreferences;
		this.occupation = occupation;
		this.patientId = patientId;
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "LifeStyle [lifestyleId=" + lifestyleId + ", smoke=" + smoke + ", alcohol=" + alcohol + ", exercise="
				+ exercise + ", foodPreferences=" + foodPreferences + ", occupation=" + occupation + ", patientId="
				+ patientId + ", userId=" + userId + "]";
	}

	public Long getLifestyleId() {
		return lifestyleId;
	}

	public void setLifestyleId(Long lifestyleId) {
		this.lifestyleId = lifestyleId;
	}

	public String getSmoke() {
		return smoke;
	}

	public void setSmoke(String smoke) {
		this.smoke = smoke;
	}

	public String getAlcohol() {
		return alcohol;
	}

	public void setAlcohol(String alcohol) {
		this.alcohol = alcohol;
	}

	public String getExercise() {
		return exercise;
	}

	public void setExercise(String exercise) {
		this.exercise = exercise;
	}

	public String getFoodPreferences() {
		return foodPreferences;
	}

	public void setFoodPreferences(String foodPreferences) {
		this.foodPreferences = foodPreferences;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
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

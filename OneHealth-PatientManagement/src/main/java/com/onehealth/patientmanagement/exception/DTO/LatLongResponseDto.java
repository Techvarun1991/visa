package com.onehealth.patientmanagement.exception.DTO;

public class LatLongResponseDto {
	private double latitude;
	private double longitude;
	 private String country;
	  private String state;
	  private String city;
	  private String postcode;
	public LatLongResponseDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public LatLongResponseDto(double latitude, double longitude, String country, String state, String city,
			String postcode) {
		super();
		this.latitude = latitude;
		this.longitude = longitude;
		this.country = country;
		this.state = state;
		this.city = city;
		this.postcode = postcode;
	}
	@Override
	public String toString() {
		return "LatLongResponseDto [latitude=" + latitude + ", longitude=" + longitude + ", country=" + country
				+ ", state=" + state + ", city=" + city + ", postcode=" + postcode + "]";
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getPostcode() {
		return postcode;
	}
	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}
	  
}

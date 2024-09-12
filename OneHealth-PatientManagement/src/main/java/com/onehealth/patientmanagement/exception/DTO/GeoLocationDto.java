package com.onehealth.patientmanagement.exception.DTO;

public class GeoLocationDto {
	  private Double latitude;
	    private Double longitude;
	    private String country;
	    private String state;
	    private String city;
	    private String postcode;
		public GeoLocationDto() {
			super();
			// TODO Auto-generated constructor stub
		}
		public GeoLocationDto(Double latitude, Double longitude, String country, String state, String city,
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
			return "GeoLocationDto [latitude=" + latitude + ", longitude=" + longitude + ", country=" + country
					+ ", state=" + state + ", city=" + city + ", postcode=" + postcode + "]";
		}
		public Double getLatitude() {
			return latitude;
		}
		public void setLatitude(Double latitude) {
			this.latitude = latitude;
		}
		public Double getLongitude() {
			return longitude;
		}
		public void setLongitude(Double longitude) {
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

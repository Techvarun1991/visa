package com.onehealth.patientmanagement.exception.DTO;

import java.util.List;

import com.onehealth.patientmanagement.entity.GeneralUser;


public class UserProfileResponse {
	private List<GeneralUser> users;
	  private int totalPages;
	    private int currentPage;
		public UserProfileResponse() {
			super();
			// TODO Auto-generated constructor stub
		}
		public UserProfileResponse(List<GeneralUser> users, int totalPages, int currentPage) {
			super();
			this.users = users;
			this.totalPages = totalPages;
			this.currentPage = currentPage;
		}
		@Override
		public String toString() {
			return "UserProfileResponse [users=" + users + ", totalPages=" + totalPages + ", currentPage=" + currentPage
					+ "]";
		}
		public List<GeneralUser> getUsers() {
			return users;
		}
		public void setUsers(List<GeneralUser> users) {
			this.users = users;
		}
		public int getTotalPages() {
			return totalPages;
		}
		public void setTotalPages(int totalPages) {
			this.totalPages = totalPages;
		}
		public int getCurrentPage() {
			return currentPage;
		}
		public void setCurrentPage(int currentPage) {
			this.currentPage = currentPage;
		}
		
}

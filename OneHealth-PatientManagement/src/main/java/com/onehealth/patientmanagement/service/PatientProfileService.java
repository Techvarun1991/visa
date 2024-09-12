package com.onehealth.patientmanagement.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.onehealth.patientmanagement.entity.GeneralUser;
import com.onehealth.patientmanagement.entity.PatientProfile;

import com.onehealth.patientmanagement.exception.DTO.ChangePasswordRequest;
import com.onehealth.patientmanagement.exception.DTO.CreatePatientProfileDto;
import com.onehealth.patientmanagement.exception.DTO.CreateUserRequestDto;
import com.onehealth.patientmanagement.exception.DTO.MyWebClientException;
import com.onehealth.patientmanagement.exception.DTO.UpdateProfileDto;
import com.onehealth.patientmanagement.exception.DTO.UserProfileResponse;
import com.onehealth.patientmanagement.exceptionn.DatabaseException;
import com.onehealth.patientmanagement.exceptionn.EmailAlreadyRegisteredException;
import com.onehealth.patientmanagement.exceptionn.ProfileNotFoundException;
import com.onehealth.patientmanagement.exceptionn.RecordNotFoundException;

public interface PatientProfileService {

	UserProfileResponse getAllUsers(int page, int pageSize);

	Optional<GeneralUser> getUserById(Long userId) throws RecordNotFoundException;

	

	GeneralUser updateUser(Long userId, GeneralUser user) throws RecordNotFoundException;

	void deleteUser(Long userId) throws RecordNotFoundException;

	GeneralUser getUserBymobileNumberandEmailId(String emailId, String mobileNumber) throws DatabaseException;
	GeneralUser getUserByEmailIdAndPassword(String emailId, String password) throws RecordNotFoundException, DatabaseException;



	long getUserCount();


	List<GeneralUser> findByFirstName(String firstName);

	List<GeneralUser> findByEmailId(String emailId);

	// patients
	Set<PatientProfile> getAllPatientsByUserId(Long userId) throws ProfileNotFoundException;


	void updatePatientProfile(UpdateProfileDto dto) throws ProfileNotFoundException, MyWebClientException;

	CreatePatientProfileDto createPatientProfile(CreatePatientProfileDto patient) throws ProfileNotFoundException;

	void deletePatientProfileById(int patientId) throws ProfileNotFoundException;

	void deletePatientProfilesByUserId(Long userId) throws ProfileNotFoundException;

	PatientProfile getPatientByUserIdAndNameIgnoreCase(Long userId, String firstName, String lastName);

	int deletePatientsByUserId(Long userId);

	List<PatientProfile> getAllPatientProfiles() throws ProfileNotFoundException;

//	void assignRoleToUser(Long userId, String string);

	Long getByEmail(String emailId);



	GeneralUser createGeneralUser(CreateUserRequestDto generalUser)
			throws EmailAlreadyRegisteredException, MyWebClientException;

	PatientProfile getPatientProfileById(int patientId);



	boolean existsPatientProfileById(int patientId);


}
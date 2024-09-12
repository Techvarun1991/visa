
package com.onehealth.patientmanagement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.onehealth.patientmanagement.entity.GeneralUser;
import com.onehealth.patientmanagement.entity.PatientProfile;

import com.onehealth.patientmanagement.exception.DTO.ChangePasswordRequest;
import com.onehealth.patientmanagement.exception.DTO.CreatePatientProfileDto;
import com.onehealth.patientmanagement.exception.DTO.CreateUserRequestDto;
import com.onehealth.patientmanagement.exception.DTO.LoginRequest;
import com.onehealth.patientmanagement.exception.DTO.ResponseMessage;
import com.onehealth.patientmanagement.exception.DTO.UpdateProfileDto;
import com.onehealth.patientmanagement.exception.DTO.UserProfileResponse;
import com.onehealth.patientmanagement.exceptionn.DatabaseException;
import com.onehealth.patientmanagement.exceptionn.EmailAlreadyRegisteredException;
import com.onehealth.patientmanagement.exceptionn.ProfileNotFoundException;
import com.onehealth.patientmanagement.exceptionn.RecordNotFoundException;

import com.onehealth.patientmanagement.service.PatientProfileService;

@RestController
@RequestMapping("/patientUser")
public class PatientProfileController {
	@Autowired
	private PatientProfileService patientUserService;

//	@Autowired
//	private KeycloakSecurityUtils keycloakSecurityUtils;

	private static final Logger logger = LoggerFactory.getLogger(PatientProfileController.class);
	


	@PostMapping("/saveUser")
	public ResponseEntity<?> createUser(@RequestBody CreateUserRequestDto generalUser) {
		try {
			logger.info("Received POST request at / saveUser with user details: {}", generalUser);
			// Call the service method to create a new user
			GeneralUser createdUser = patientUserService.createGeneralUser(generalUser);
//			patientUserService.assignRoleToUser(createdUser.getUserId(), "PATIENT");

			// Create a response message with a success message and the created user object
			ResponseMessage<GeneralUser> responseMessage = new ResponseMessage<>("User Created Successfully",
					createdUser);
			return new ResponseEntity<>(responseMessage, HttpStatus.CREATED);
		} catch (EmailAlreadyRegisteredException e) {
			// Log the warning and return a conflict status with the exception message
			logger.warn("Error occurred while saving User: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		} catch (Exception e) {
			// Log the warning and return an internal server error status
			logger.error("Unexpected error occurred while saving User: {}", e.getMessage(), e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
		}
	}



	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
		try {
			logger.info("Received POST request at /login with email: {}", loginRequest.getEmailId());
//			AccessTokenResponse tokenResponse = keycloakSecurityUtils.getAccessToken(loginRequest.getEmailId(),
//				loginRequest.getPassword());
			GeneralUser user = patientUserService.getUserByEmailIdAndPassword(loginRequest.getEmailId(), loginRequest.getPassword());
			Map<String, Object> response = new HashMap<>();
//			response.put("userId", userId);
//			response.put("tokenResponse", tokenResponse);
			ResponseMessage<Map<String, Object>> responseMessage = new ResponseMessage<>("Login Successful", response);
			return ResponseEntity.ok(responseMessage);
		} catch (Exception e) {
			logger.error("Error during login for email {}: {}", loginRequest.getEmailId(), e.getMessage(), e);
			ResponseMessage<String> errorResponse = new ResponseMessage<>("Invalid credentials", null);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
		}
	}

	@GetMapping
	public String Hello() {
		logger.info("Received GET request at /patientUser");
		return "Hello From /patientUser";
	}

	@GetMapping("/all")
	public ResponseEntity<UserProfileResponse> getAllUsers(@RequestParam(required = false, defaultValue = "0") int page,
			@RequestParam(required = false, defaultValue = "10") int pageSize) {
		try {
			logger.info("Received GET request at /patientUser/all");
			UserProfileResponse userProfileResponse = patientUserService.getAllUsers(page, pageSize);
			return ResponseEntity.ok(userProfileResponse);
		} catch (Exception e) {
			logger.error("An error occurred while retrieving all users: " + e.getMessage());
			return ResponseEntity.status(500).body(new UserProfileResponse(null, 0, 0));
		}
	}

	@GetMapping("/count")
	public ResponseEntity<?> getUserCount() {
		try {
			long count = patientUserService.getUserCount();
			return new ResponseEntity<>(count, HttpStatus.OK);
		} catch (Exception e) {
			String errorMessage = "Failed to retrieve user count";
			logger.error(errorMessage, e);
			return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Get a user by ID.
	 * 
	 * @throws RecordNotFoundException
	 */

	@GetMapping("/{userId}")
	public ResponseEntity<?> getUserById(@PathVariable Long userId) {
		try {
			// Log the incoming request
			logger.info("Received GET request at /patientUser/{}", userId);

			// Attempt to retrieve the user by ID
			Optional<GeneralUser> user = patientUserService.getUserById(userId);

			// Return the retrieved user with a success status code
			return new ResponseEntity<>(user, HttpStatus.OK);
		} catch (RecordNotFoundException e) {
			// Log the error for user not found
			logger.error("User not found with ID: {}", userId);

			// Return a proper error response for user not found
			return new ResponseEntity<>("User not found with ID: " + userId, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			// Log other unexpected errors
			logger.error("An unexpected error occurred while retrieving user: {}", e.getMessage());

			// Return a proper error response for internal server error
			return new ResponseEntity<>("An unexpected error occurred while retrieving user",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Update an existing user.
	 * 
	 * @throws RecordNotFoundException
	 */

	@PutMapping("/{userId}")
	public ResponseEntity<ResponseMessage<GeneralUser>> updateUser(@PathVariable Long userId,
			@RequestBody GeneralUser user) {
		try {
			// Log the incoming request
			logger.info("Received PUT request at /patientUser/{}", userId);

			// Update the user
			GeneralUser updatedUser = patientUserService.updateUser(userId, user);
			ResponseMessage<GeneralUser> responseMessage = new ResponseMessage<>("User Updated Successfully",
					updatedUser);
			return new ResponseEntity<>(responseMessage, HttpStatus.OK);
			// Check if user is updated successfully

		} catch (RecordNotFoundException e) {
			// Log record not found exception
			logger.error("Record Not Found: " + e.getMessage());

			// Return proper error response for record not found
			return new ResponseEntity<>(new ResponseMessage<>("User Not Found", null), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			// Log other unexpected errors
			logger.error("An unexpected error occurred while updating user: " + e.getMessage());

			// Return proper error response for internal server error
			return new ResponseEntity<>(new ResponseMessage<>("An unexpected error occurred while updating user", null),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Delete a user by ID.
	 * 
	 * @throws RecordNotFoundException
	 */
	@DeleteMapping("/deleteAllPAtientsByUserId/{userId}")
	public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
		try {
			// Log the incoming request
			logger.info("Received DELETE request at /patientUser/{}", userId);

			// Delete the user
			patientUserService.deleteUser(userId);

			// Return success response
			return new ResponseEntity<>("Deleted Successfully", HttpStatus.OK);
		} catch (RecordNotFoundException e) {
			// Log record not found exception
			logger.error("Record Not Found: " + e.getMessage());

			// Return proper error response for record not found
			return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			// Log other unexpected errors
			logger.error("An unexpected error occurred while deleting user: " + e.getMessage());

			// Return proper error response for internal server error
			return new ResponseEntity<>("An unexpected error occurred while deleting user",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}



	@GetMapping("/searchByFirstName")
	public ResponseEntity<?> getUsersByFirstName(@RequestParam String firstName) {
		List<GeneralUser> users = patientUserService.findByFirstName(firstName);
		if (users.isEmpty()) {
			return new ResponseEntity<>("No users found with the given first name.", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(users, HttpStatus.OK);
	}

	@GetMapping("/searchByEmail")
	public ResponseEntity<List<GeneralUser>> getUserByEmail(@RequestParam String emailId) {
		List<GeneralUser> users = patientUserService.findByEmailId(emailId);
		if (users.isEmpty()) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.ok(users);
		}
	}

	@PostMapping("/add")
	public ResponseEntity<String> createPatientProfile(@RequestBody CreatePatientProfileDto patient) {
	    try {
	        logger.info("Received a POST request to create a new patient profile");

	        // Check if userId is not null
	        if (patient.getUserId() == null) {
	            logger.warn("User ID is null");
	            return new ResponseEntity<>("User ID cannot be null", HttpStatus.BAD_REQUEST);
	        }

	        // Create the patient profile
	        patientUserService.createPatientProfile(patient);
	        return new ResponseEntity<>("Created Patient Profile", HttpStatus.CREATED);
	    } catch (ProfileNotFoundException e) {
	        logger.error("An error occurred while creating a patient profile: {}", e.getMessage());
	        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	    } catch (Exception e) {
	        logger.error("An internal error occurred: {}", e.getMessage());
	        return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

//	@PostMapping("/add")
//	public ResponseEntity<String> createPatientProfile(@RequestBody CreatePatientProfileDto patient) {
//		try {
//			logger.info("Received a POST request to create a new patient profile");
//
//			// Check if userId is not null
//
//			// Create the patient profile
//			patientUserService.createPatientProfile(patient);
//			return new ResponseEntity<>("Created Patient Profile", HttpStatus.CREATED);
//		} catch (ProfileNotFoundException e) {
//			logger.error("An error occurred while creating a patient profile", e);
//			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}

	@GetMapping("/allProfileByuserId/{userId}")
	public ResponseEntity<?> getAllPatientsByUserId(@PathVariable Long userId) {
		try {
			logger.info("Received a GET request to retrieve all patient profiles for user ID: {}", userId);

			Set<PatientProfile> patientProfiles = patientUserService.getAllPatientsByUserId(userId);
			logger.info("Retrieved patient profiles: {}", patientProfiles);

			return new ResponseEntity<>(patientProfiles, HttpStatus.OK);
		} catch (ProfileNotFoundException e) {
			logger.error("Profile not found for user ID: {}", userId);
			return new ResponseEntity<>("No Available data for this User Id", HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			logger.error("An error occurred while retrieving patient profiles for user ID: {}", userId, e);
			return new ResponseEntity<>("An error occurred while retrieving patient profiles for user ID",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/byPatientId/{patientId}")
	public PatientProfile getPatientProfileById(@PathVariable int patientId) {
		return patientUserService.getPatientProfileById(patientId);
	}
	
	@GetMapping("/existsByPatientId/{patientId}")
	public boolean existsPatientProfileById(@PathVariable int patientId) {
		return patientUserService.existsPatientProfileById(patientId);
	}

	@PutMapping("/byPatientId/{patientId}")
	public ResponseEntity<String> updatePatientProfile(@PathVariable long patientId,
			@RequestBody UpdateProfileDto dto) {
		try {
			logger.info("Received a PUT request to update patient profile with ID: {}", patientId);

			patientUserService.updatePatientProfile(dto);

			return ResponseEntity.ok("Patient Profile Updated Successfully");
		} catch (ProfileNotFoundException e) {
			logger.error("Profile not found for patient ID: {}", patientId);
			return new ResponseEntity<>("Profile not found for patient ID", HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			logger.error("An error occurred while updating patient profile with ID: {}", patientId, e);
			return new ResponseEntity<>("An error occurred while updating patient profile with ID",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/byPatientId/{patientId}")
	public ResponseEntity<String> deletePatientProfileById(@PathVariable int patientId) {
		try {
			patientUserService.deletePatientProfileById(patientId);
			return ResponseEntity.ok("Patient profile deleted successfully.");
		} catch (ProfileNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
		}
	}

	@DeleteMapping("/deleteAllprofiles/byUserId/{userId}")
	public ResponseEntity<String> deletePatientProfilesByUserId(@PathVariable Long userId) {
	    try {
	        // Attempt to delete patient profiles by userId
	        patientUserService.deletePatientProfilesByUserId(userId);
	        return ResponseEntity.ok("Patient profiles deleted successfully for userId: " + userId);
	    } catch (ProfileNotFoundException e) {
	        // Catch and handle the ProfileNotFoundException
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	    } catch (Exception e) {
	        // Handle other exceptions (e.g., database errors)
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting patient profiles.");
	    }
	}


	@GetMapping("/allProfiles")
	public ResponseEntity<?> getAllPatientProfiles() {
		try {
			List<PatientProfile> patientProfiles = patientUserService.getAllPatientProfiles();
			return ResponseEntity.ok(patientProfiles);
		} catch (ProfileNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
		}
	}

}

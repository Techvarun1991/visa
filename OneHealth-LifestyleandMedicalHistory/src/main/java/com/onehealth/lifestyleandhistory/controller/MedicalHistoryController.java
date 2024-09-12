package com.onehealth.lifestyleandhistory.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.onehealth.lifestyleandhistory.DTO.ResponseMessage;
import com.onehealth.lifestyleandhistory.entity.MedicalHistory;
import com.onehealth.lifestyleandhistory.exception.DatabaseException;
import com.onehealth.lifestyleandhistory.exception.RecordNotFoundException;
import com.onehealth.lifestyleandhistory.service.MedicalHistoryService;

import java.util.List;

@RestController
@RequestMapping("/lifeStyleAndHistory/MedicalHistory")
/**
 * The MedicalHistoryController class handles HTTP requests related to medical
 * history information.
 */
public class MedicalHistoryController {

	private static final Logger logger = LoggerFactory.getLogger(MedicalHistoryController.class);

	@Autowired
	private MedicalHistoryService medicalHistoryService;

	/**
	 * Handles a GET request to the root endpoint. Returns a simple greeting
	 * message.
	 *
	 * @return A greeting message.
	 */

	@GetMapping
	public String Hello() {
		logger.info("Received a GET request to root endpoint");
		return "Hello From /lifeStyleAndHistory/MedicalHistory ";
	}

	/**
	 * Handles a GET request to retrieve all medical histories.
	 *
	 * @return A list of all medical histories along with an appropriate HTTP
	 *         status.
	 */
	@GetMapping("/all")
	public ResponseEntity<?> getAllMedicalHistories() {
		try {
			logger.info("Received a GET request to retrieve all medical histories");

			// Call the service to retrieve all medical histories
			List<MedicalHistory> medicalHistories = medicalHistoryService.getAllMedicalHistories();

			// Log the number of retrieved medical histories
			logger.info("Retrieved {} medical histories", medicalHistories.size());

			// Return the retrieved medical histories in the response
			return new ResponseEntity<>(medicalHistories, HttpStatus.OK);
		} catch (Exception e) {
			// Log the exception
			logger.error("An error occurred while retrieving all medical histories", e);

			// Return an error response with appropriate message in the body
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to retrieve medical histories: " + e.getMessage());
		}
	}

	/**
	 * Handles a GET request to retrieve a specific medical history by its patient
	 * ID.
	 *
	 * @param patientId The patient ID of the medical history to retrieve.
	 * @return The retrieved medical history along with an appropriate HTTP status.
	 * @throws RecordNotFoundException If the specified medical history is not
	 *                                 found.
	 */

	@GetMapping("/byPatientId/{patientId}")
	public ResponseEntity<?> getMedicalHistoryByPatientId(@PathVariable int patientId) {
		try {
			logger.info("Received a GET request to retrieve medical history by patientId: {}", patientId);

			// Call the service to retrieve medical history by patientId
			MedicalHistory medicalHistory = medicalHistoryService.getMedicalHistoryByPatientId(patientId);

			// Log the retrieved medical history
			logger.info("Retrieved medical history: {}", medicalHistory);

			// Return the retrieved medical history in the response
			return new ResponseEntity<>(medicalHistory, HttpStatus.OK);
		} catch (RecordNotFoundException e) {
			// Log the exception
			logger.error("No medical history found for patientId: {}", patientId);

			// Return a not found response with appropriate message in the body
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("No medical history found for patientId: " + patientId);
		} catch (Exception e) {
			// Log the exception
			logger.error("An error occurred while retrieving medical history by patientId: {}", patientId, e);

			// Return an error response with appropriate message in the body
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to retrieve medical history for patientId: " + patientId);
		}
	}

	/**
	 * Handles a POST request to create a new medical history.
	 *
	 * @param medicalHistory The medical history details to be created.
	 * @return A response message along with an appropriate HTTP status.
	 * @throws DatabaseException If there is an issue with the database operation.
	 */

	@PostMapping("/add")
	public ResponseEntity<String> createMedicalHistory(@RequestBody MedicalHistory medicalHistory) {
		try {
			// Check if a medical history record already exists for the given patientId and
			// userId
			boolean historyExists = medicalHistoryService.existsByPatientIdAndUserId(medicalHistory.getPatientId(),
					medicalHistory.getUserId());

			if (historyExists) {
				// Return a bad request response with appropriate message in the body
				return ResponseEntity.badRequest().body("A record already exists for this patientId and userId");
			}

			// Create the medical history record since it doesn't exist and patientId is
			// valid
			
			
			boolean flag = medicalHistoryService.createMedicalHistory(medicalHistory);
	        if(flag) {
		        // Return a success response with appropriate message in the body
		        return new ResponseEntity<>("Medical History Added Successfully", HttpStatus.CREATED);
	        }
	        else {
	        	// Return a success response with appropriate message in the body
		        return new ResponseEntity<>("Patient Doesn't exists", HttpStatus.NOT_FOUND);
	        }

		} catch (Exception e) {
			// Log the exception
			logger.error("An error occurred while creating medical history", e);

			// Return an error response with appropriate message in the body
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to create medical history: " + e.getMessage());
		}
	}

	/**
	 * Handles a PUT request to update an existing medical history.
	 *
	 * @param patientId      The patient ID of the medical history to update.
	 * @param medicalHistory The updated medical history details.
	 * @return A response message along with an appropriate HTTP status.
	 * @throws RecordNotFoundException If the specified medical history is not
	 *                                 found.
	 */
	@PutMapping("/byPatientId/{patientId}")
	public ResponseEntity<ResponseMessage<MedicalHistory>> updateMedicalHistory(@PathVariable int patientId,
			@RequestBody MedicalHistory medicalHistory) {
		try {
			logger.info("Received a PUT request to update medical history with patientId: {}", patientId);

			// Call the service to update medical history by patientId
			MedicalHistory updatedMedicalHistory = medicalHistoryService.updateMedicalHistory(patientId,
					medicalHistory);

			// Create a response message
			ResponseMessage<MedicalHistory> responseMessage = new ResponseMessage<>("Update record successfully",
					updatedMedicalHistory);

			// Return a success response with appropriate message in the body
			return new ResponseEntity<>(responseMessage, HttpStatus.OK);
		} catch (RecordNotFoundException e) {
			// Log the exception
			logger.error("No medical history found for patientId: {}", patientId);

			// Return a not found response with appropriate message in the body
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ResponseMessage<>("Medical history not found", null));
		} catch (Exception e) {
			// Log the exception
			logger.error("An error occurred while updating medical history with patientId: {}", patientId, e);

			// Return an error response with appropriate message in the body
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ResponseMessage<>("Failed to update medical history", null));
		}
	}

	/**
	 * Handles a DELETE request to delete all medical histories associated with a
	 * specific patient ID and user ID.
	 *
	 * @param patientId The patient ID.
	 * @param userId    The user ID.
	 * @return A success message along with an appropriate HTTP status.
	 * @throws RecordNotFoundException If no medical histories are found for the
	 *                                 given patient ID and user ID.
	 */
	@DeleteMapping("/byPatientId/{patientId}/byUserId/{userId}")
	public ResponseEntity<String> deleteMedicalHistoryByPatientIdAndUserId(@PathVariable int patientId,
			@PathVariable Long userId) {
		try {
			logger.info("Received a DELETE request to delete medical history with patientId and userId: {} {}",
					patientId, userId);

			// Call the service to delete medical history by patientId and userId
			medicalHistoryService.deleteMedicalHistoryByPatientIdAndUserId(patientId, userId);

			// Return a success response with appropriate message in the body
			return new ResponseEntity<>("Delete All Record Successfully", HttpStatus.OK);
		} catch (RecordNotFoundException e) {
			// Log the exception
			logger.error("Medical history not found for patientId: {} and userId: {}", patientId, userId);

			// Return a not found response with appropriate message in the body
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Medical history not found for patientId: " + patientId + " and userId: " + userId);
		} catch (Exception e) {
			// Log the exception
			logger.error("An error occurred while deleting medical history with patientId: {} and userId: {}",
					patientId, userId, e);

			// Return an error response with appropriate message in the body
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to delete medical history for patientId: " + patientId + " and userId: " + userId);
		}
	}

	/**
	 * Handles a DELETE request to delete a specific medical history by its patient
	 * ID.
	 *
	 * @param patientId The patient ID of the medical history to delete.
	 * @return A success message along with an appropriate HTTP status.
	 */
	@DeleteMapping("/byPatientId/{patientId}")
	public ResponseEntity<String> deleteMedicalHistoryByPatientId(@PathVariable int patientId) {
		try {
			logger.info("Received a DELETE request to delete medical history by patientId: {}", patientId);

			// Call the service to delete medical history by patientId
			medicalHistoryService.deleteMedicalHistoryByPatientId(patientId);

			// Return a success response with appropriate message in the body
			return new ResponseEntity<>("Medical History Deleted Successfully", HttpStatus.OK);
		} catch (RecordNotFoundException e) {
			// Log the exception
			logger.warn("Medical history not found with patientId: {}", patientId);

			// Return a not found response with appropriate message in the body
			return new ResponseEntity<>("Medical History not found with patientId: " + patientId, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			// Log the exception
			logger.error("An error occurred while deleting medical history with patientId: {}", patientId, e);

			// Return an error response with appropriate message in the body
			return new ResponseEntity<>("Failed to delete medical history with patientId: " + patientId,
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

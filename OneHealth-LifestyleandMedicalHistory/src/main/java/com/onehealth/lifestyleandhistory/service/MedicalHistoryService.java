package com.onehealth.lifestyleandhistory.service;

import com.onehealth.lifestyleandhistory.entity.MedicalHistory;
import com.onehealth.lifestyleandhistory.exception.DatabaseException;
import com.onehealth.lifestyleandhistory.exception.RecordNotFoundException;

import java.util.List;

import org.springframework.http.ResponseEntity;

/**
 * The MedicalHistoryService interface defines the operations for managing
 * medical history-related data. It provides methods for retrieving, creating,
 * updating, and deleting medical history records.
 * <p>
 * This interface is intended to be implemented by concrete service classes.
 */
public interface MedicalHistoryService {

	/**
	 * Retrieves a list of all medical history records.
	 *
	 * @return List of MedicalHistory records.
	 */
	List<MedicalHistory> getAllMedicalHistories();

	/**
	 * Retrieves a specific medical history record by its patient ID.
	 *
	 * @param patientId The unique ID of the patient associated with the medical
	 *                  history.
	 * @return The retrieved MedicalHistory record.
	 * @throws RecordNotFoundException If the record is not found.
	 */
	MedicalHistory getMedicalHistoryByPatientId(int patientId) throws RecordNotFoundException;

	/**
	 * Creates a new medical history record.
	 *
	 * @param medicalHistory The MedicalHistory object to be created.
	 * @return The created MedicalHistory record.
	 * @throws DatabaseException If there is an issue with the database operation.
	 */
	boolean createMedicalHistory(MedicalHistory medicalHistory);

	/**
	 * Updates an existing medical history record.
	 *
	 * @param patientId      The unique ID of the patient associated with the
	 *                       medical history record to be updated.
	 * @param medicalHistory The updated MedicalHistory object.
	 * @return The updated MedicalHistory record.
	 * @throws RecordNotFoundException If the record is not found.
	 */
	MedicalHistory updateMedicalHistory(int patientId, MedicalHistory medicalHistory) throws RecordNotFoundException;

	/**
	 * Deletes a medical history record by its patient ID.
	 *
	 * @param patientId The unique ID of the patient associated with the medical
	 *                  history record to be deleted.
	 * @throws RecordNotFoundException If the record is not found.
	 */
	void deleteMedicalHistoryByPatientId(int patientId) throws RecordNotFoundException;

	/**
	 * Deletes all medical history records associated with a specific patient ID and
	 * user ID.
	 *
	 * @param patientId The patient ID.
	 * @param userId    The user ID.
	 * @throws RecordNotFoundException If no medical history records are found for
	 *                                 the given patient ID and user ID.
	 */
	void deleteMedicalHistoryByPatientIdAndUserId(int patientId, Long userId) throws RecordNotFoundException;

	boolean existsByPatientIdAndUserId(int patientId, Long userId);
}

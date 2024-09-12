package com.onehealth.lifestyleandhistory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.onehealth.lifestyleandhistory.entity.MedicalHistory;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing medical history records.
 */
@Repository
public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Long> {

	/**
	 * Retrieves an optional medical history record by patient ID.
	 *
	 * @param patientId The patient's ID.
	 * @return An optional containing the medical history record if found, empty
	 *         otherwise.
	 */
	Optional<MedicalHistory> findByPatientId(int patientId);

	/**
	 * Retrieves a list of medical history records by patient ID and user ID.
	 *
	 * @param patientId The patient's ID.
	 * @param userId    The user's ID.
	 * @return A list of medical history records matching the given patient and
	 *         user.
	 */
	List<MedicalHistory> findByPatientIdAndUserId(int patientId, Long userId);

	/**
	 * Checks if a medical history record exists for the specified patient ID.
	 *
	 * @param patientId The patient's ID.
	 * @return True if a medical history record exists for the patient, false
	 *         otherwise.
	 */
	boolean existsByPatientId(int patientId);

	/**
	 * Deletes medical history records by patient ID.
	 *
	 * @param patientId The patient's ID.
	 */
	@Modifying
	@Transactional
	void deleteByPatientId(int patientId);

	/**
	 * Checks if a medical history record exists for the specified patient ID and
	 * user ID.
	 *
	 * @param patientId The patient's ID.
	 * @param userId    The user's ID.
	 * @return True if a medical history record exists for the patient and user,
	 *         false otherwise.
	 */
	boolean existsByPatientIdAndUserId(int patientId, Long userId);
}

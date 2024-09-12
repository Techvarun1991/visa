package com.onehealth.lifestyleandhistory.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import com.onehealth.lifestyleandhistory.entity.LifeStyle;
import com.onehealth.lifestyleandhistory.entity.MedicalHistory;
import com.onehealth.lifestyleandhistory.exception.DatabaseException;
import com.onehealth.lifestyleandhistory.exception.RecordNotFoundException;
import com.onehealth.lifestyleandhistory.repository.MedicalHistoryRepository;
import com.onehealth.lifestyleandhistory.service.MedicalHistoryService;

import jakarta.transaction.Transactional;

import java.util.List;

@Service
/**
 * Implementation of the MedicalHistoryService interface providing operations
 * for managing medical history-related data.
 */
public class MedicalHistoryServiceImpl implements MedicalHistoryService {

	@Autowired
	private MedicalHistoryRepository medicalHistoryRepository;

	private final WebClient webClient;
	
	@Autowired  
	public MedicalHistoryServiceImpl(WebClient webClient) {         this.webClient = webClient;     }

//	@Value("${apiGatewayUrl}") // Set the URL in your properties or configuration
//	private String apiGatewayUrl;

	/**
	 * Retrieves a list of all medical history records.
	 *
	 * @return List of MedicalHistory records.
	 */
	@Override
	public List<MedicalHistory> getAllMedicalHistories() {
		return medicalHistoryRepository.findAll();
	}

	/**
	 * Retrieves a specific medical history record by its patient ID.
	 *
	 * @param patientId The unique ID of the patient associated with the medical
	 *                  history.
	 * @return The retrieved MedicalHistory record.
	 * @throws RecordNotFoundException If the record is not found.
	 */
	@Override
	public MedicalHistory getMedicalHistoryByPatientId(int patientId) throws RecordNotFoundException {
		return medicalHistoryRepository.findByPatientId(patientId).orElseThrow(
				() -> new RecordNotFoundException("Medical history not found with patientId: " + patientId));
	}

	/**
	 * Creates a new medical history record.
	 *
	 * @param medicalHistory The MedicalHistory object to be created.
	 * @return The created MedicalHistory record.
	 * @throws DatabaseException If there is an issue with the database operation.
	 */
	@Override
	public boolean createMedicalHistory(MedicalHistory medicalHistory) {

		// Now, check if the patientId exists in the patientProfile microservice
//		ResponseEntity<String> patientProfileResponse = restTemplate.getForEntity(
//				apiGatewayUrl + "/patientProfile/byPatientId/" + medicalHistory.getPatientId(), String.class);
		boolean flag = webClient.get()
				.uri("http://onehealth-patientmanagement/patientUser/existsByPatientId/" + medicalHistory.getPatientId())
	            .retrieve()
	            .bodyToMono(Boolean.class)
	            .block();
		
		if (flag) {
			return false;
		}else {
			MedicalHistory saveHistory = medicalHistoryRepository.save(medicalHistory);
			return true;
		}
	}

	/**
	 * Updates an existing medical history record.
	 *
	 * @param patientId      The unique ID of the patient associated with the
	 *                       medical history record to be updated.
	 * @param medicalHistory The updated MedicalHistory object.
	 * @return The updated MedicalHistory record.
	 * @throws RecordNotFoundException If the record is not found.
	 */
	@Override
	public MedicalHistory updateMedicalHistory(int patientId, MedicalHistory medicalHistory)
			throws RecordNotFoundException {
		MedicalHistory existingMedicalHistory = medicalHistoryRepository.findByPatientId(patientId).orElseThrow(
				() -> new RecordNotFoundException("Medical history not found with patientId: " + patientId));

		// Update the properties based on your needs.

		existingMedicalHistory.setAllergies(medicalHistory.getAllergies());
		existingMedicalHistory.setCurrentMedication(medicalHistory.getCurrentMedication());
		existingMedicalHistory.setPastMedication(medicalHistory.getPastMedication());
		existingMedicalHistory.setChronicDiseases(medicalHistory.getChronicDiseases());
		existingMedicalHistory.setInjuries(medicalHistory.getInjuries());
		existingMedicalHistory.setSurgeries(medicalHistory.getSurgeries());

		return medicalHistoryRepository.save(existingMedicalHistory);
	}

	/**
	 * Deletes a medical history record by its patient ID.
	 *
	 * @param patientId The unique ID of the patient associated with the medical
	 *                  history record to be deleted.
	 * @throws RecordNotFoundException If the record is not found.
	 */
	@Override
	@Transactional
	public void deleteMedicalHistoryByPatientId(int patientId) throws RecordNotFoundException {
		if (!medicalHistoryRepository.existsByPatientId(patientId)) {
			throw new RecordNotFoundException("Medical history not found with patientId: " + patientId);
		}
		medicalHistoryRepository.deleteByPatientId(patientId);
	}

	/**
	 * Deletes all medical history records associated with a specific patient ID and
	 * user ID.
	 *
	 * @param patientId The patient ID.
	 * @param userId    The user ID.
	 * @throws RecordNotFoundException If no medical history records are found for
	 *                                 the given patient ID and user ID.
	 */
	@Override
	public void deleteMedicalHistoryByPatientIdAndUserId(int patientId, Long userId) throws RecordNotFoundException {
		List<MedicalHistory> medicalHistories = medicalHistoryRepository.findByPatientIdAndUserId(patientId, userId);

		if (medicalHistories.isEmpty()) {
			throw new RecordNotFoundException(
					"Medical history not found with patientId and userId: " + patientId + " " + userId);
		}
		medicalHistoryRepository.deleteAll(medicalHistories);
	}

	@Override
	public boolean existsByPatientIdAndUserId(int patientId, Long userId) {
		// TODO Auto-generated method stub
		return medicalHistoryRepository.existsByPatientIdAndUserId(patientId, userId);
	}
}

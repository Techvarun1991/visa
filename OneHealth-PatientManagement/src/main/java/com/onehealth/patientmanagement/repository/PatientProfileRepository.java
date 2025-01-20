package com.onehealth.patientmanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.onehealth.patientmanagement.entity.PatientProfile;

public interface PatientProfileRepository extends JpaRepository<PatientProfile, Integer> {

	Optional<PatientProfile> findByLastNameAndFirstNameAndGeneralUserEmailIdAndGeneralUserUserId(String lastName,
			String firstName, String email, Long userId);

	long countByGeneralUserUserId(Long userId);

	@Query("SELECT AVG(p.age) FROM PatientProfile p WHERE p.generalUser.userId = :userId")
	Double findAverageAgeByUserId(@Param("userId") Long userId);


}

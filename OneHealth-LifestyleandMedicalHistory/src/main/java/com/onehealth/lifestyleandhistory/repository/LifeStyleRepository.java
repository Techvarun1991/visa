package com.onehealth.lifestyleandhistory.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.onehealth.lifestyleandhistory.entity.LifeStyle;

import jakarta.transaction.Transactional;

/**
 * The `LifeStyleRepository` interface extends JpaRepository to provide the
 * necessary methods for performing CRUD (Create, Read, Update, Delete)
 * operations on the LifeStyle entity. It automatically generates the
 * implementation for the repository, allowing interactions with the database
 * and the LifeStyle table.
 */
public interface LifeStyleRepository extends JpaRepository<LifeStyle, Long> {

	Optional<LifeStyle> findByPatientId(int patientId);

	boolean existsByPatientId(int patientId);

	@Modifying
	@Transactional
	void deleteByPatientId(int patientId);

	List<LifeStyle> findAllByUserId(Long userId);

	boolean existsByPatientIdAndUserId(int patientId, Long userId);

}

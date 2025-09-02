package com.example.erp.grade;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    Optional<Grade> findByEnrollmentId(Long enrollmentId);
    List<Grade> findByEnrollment_Offering_Id(Long offeringId);
    List<Grade> findByEnrollment_Student_Id(Long studentId);
}



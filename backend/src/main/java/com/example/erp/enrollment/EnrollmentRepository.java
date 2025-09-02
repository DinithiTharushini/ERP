package com.example.erp.enrollment;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    boolean existsByStudentIdAndOfferingId(Long studentId, Long offeringId);
    long countByOfferingIdAndStatus(Long offeringId, EnrollmentStatus status);
    Optional<Enrollment> findFirstByOfferingIdAndStatusOrderByCreatedAtAsc(Long offeringId, EnrollmentStatus status);
    List<Enrollment> findByStudentId(Long studentId);
    List<Enrollment> findByOfferingId(Long offeringId);
}



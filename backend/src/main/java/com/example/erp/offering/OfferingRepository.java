package com.example.erp.offering;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfferingRepository extends JpaRepository<Offering, Long> {
    List<Offering> findByTerm(String term);
    List<Offering> findByInstructor_StaffId(String staffId);
    List<Offering> findByInstructor_StaffIdAndTerm(String staffId, String term);
}



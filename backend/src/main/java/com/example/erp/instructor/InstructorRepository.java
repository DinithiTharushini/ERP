package com.example.erp.instructor;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {
    Optional<Instructor> findByStaffId(String staffId);
    boolean existsByStaffIdAndIdNot(String staffId, Long id);

    @Query("select i from Instructor i where lower(i.name) like lower(concat('%', :q, '%')) or lower(i.staffId) like lower(concat('%', :q, '%'))")
    List<Instructor> search(@Param("q") String query);
}



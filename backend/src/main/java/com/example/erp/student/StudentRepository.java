package com.example.erp.student;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByIndexNumber(String indexNumber);
    boolean existsByIndexNumberAndIdNot(String indexNumber, Long id);

    @Query("select s from Student s where lower(s.firstName) like lower(concat('%', :q, '%')) or lower(s.lastName) like lower(concat('%', :q, '%')) or lower(s.indexNumber) like lower(concat('%', :q, '%'))")
    List<Student> search(@Param("q") String query);
}



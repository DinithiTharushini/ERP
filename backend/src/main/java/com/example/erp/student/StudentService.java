package com.example.erp.student;

import com.example.erp.student.dto.StudentRequest;
import com.example.erp.student.dto.StudentResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {
    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<StudentResponse> list(String q) {
        List<Student> src = (q != null && !q.isBlank()) ? repository.search(q) : repository.findAll();
        return src.stream().map(this::toResponse).collect(Collectors.toList());
    }

    public StudentResponse get(Long id) {
        Student s = repository.findById(id).orElseThrow(() -> new RuntimeException("not_found"));
        return toResponse(s);
    }

    @Transactional
    public StudentResponse create(StudentRequest req) {
        if (repository.findByIndexNumber(req.getIndexNumber()).isPresent()) {
            throw new IllegalArgumentException("index_exists");
        }
        Student s = new Student(req.getIndexNumber(), req.getFirstName(), req.getLastName(), req.getEmail());
        Student saved = repository.save(s);
        return toResponse(saved);
    }

    @Transactional
    public StudentResponse update(Long id, StudentRequest req) {
        Student s = repository.findById(id).orElseThrow(() -> new RuntimeException("not_found"));
        if (repository.existsByIndexNumberAndIdNot(req.getIndexNumber(), id)) {
            throw new IllegalArgumentException("index_exists");
        }
        s.setIndexNumber(req.getIndexNumber());
        s.setFirstName(req.getFirstName());
        s.setLastName(req.getLastName());
        s.setEmail(req.getEmail());
        Student saved = repository.save(s);
        return toResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) throw new RuntimeException("not_found");
        repository.deleteById(id);
    }

    private StudentResponse toResponse(Student s) {
        return new StudentResponse(s.getId(), s.getIndexNumber(), s.getFirstName(), s.getLastName(), s.getEmail());
    }
}



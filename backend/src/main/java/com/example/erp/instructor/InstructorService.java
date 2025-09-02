package com.example.erp.instructor;

import com.example.erp.instructor.dto.InstructorRequest;
import com.example.erp.instructor.dto.InstructorResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InstructorService {
    private final InstructorRepository repository;

    public InstructorService(InstructorRepository repository) {
        this.repository = repository;
    }

    public List<InstructorResponse> list(String q) {
        List<Instructor> src = (q != null && !q.isBlank()) ? repository.search(q) : repository.findAll();
        return src.stream().map(this::toResponse).collect(Collectors.toList());
    }

    public InstructorResponse get(Long id) {
        Instructor i = repository.findById(id).orElseThrow(() -> new RuntimeException("not_found"));
        return toResponse(i);
    }

    @Transactional
    public InstructorResponse create(InstructorRequest req) {
        if (repository.findByStaffId(req.getStaffId()).isPresent()) {
            throw new IllegalArgumentException("staff_exists");
        }
        Instructor i = new Instructor(req.getStaffId(), req.getName(), req.getEmail());
        Instructor saved = repository.save(i);
        return toResponse(saved);
    }

    @Transactional
    public InstructorResponse update(Long id, InstructorRequest req) {
        Instructor i = repository.findById(id).orElseThrow(() -> new RuntimeException("not_found"));
        if (repository.existsByStaffIdAndIdNot(req.getStaffId(), id)) {
            throw new IllegalArgumentException("staff_exists");
        }
        i.setStaffId(req.getStaffId());
        i.setName(req.getName());
        i.setEmail(req.getEmail());
        Instructor saved = repository.save(i);
        return toResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) throw new RuntimeException("not_found");
        repository.deleteById(id);
    }

    private InstructorResponse toResponse(Instructor i) {
        return new InstructorResponse(i.getId(), i.getStaffId(), i.getName(), i.getEmail());
    }
}



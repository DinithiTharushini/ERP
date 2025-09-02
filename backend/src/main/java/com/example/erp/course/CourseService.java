package com.example.erp.course;

import com.example.erp.course.dto.CourseRequest;
import com.example.erp.course.dto.CourseResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {
    private final CourseRepository repository;

    public CourseService(CourseRepository repository) {
        this.repository = repository;
    }

    public List<CourseResponse> list() {
        return repository.findAll().stream()
                .map(c -> new CourseResponse(c.getId(), c.getCode(), c.getTitle()))
                .collect(Collectors.toList());
    }

    public CourseResponse get(Long id) {
        Course c = repository.findById(id).orElseThrow(() -> new RuntimeException("not_found"));
        return new CourseResponse(c.getId(), c.getCode(), c.getTitle());
    }

    @Transactional
    public CourseResponse create(CourseRequest req) {
        if (repository.findByCode(req.getCode()).isPresent()) {
            throw new IllegalArgumentException("code_exists");
        }
        Course saved = repository.save(new Course(req.getCode(), req.getTitle()));
        return new CourseResponse(saved.getId(), saved.getCode(), saved.getTitle());
    }

    @Transactional
    public CourseResponse update(Long id, CourseRequest req) {
        Course c = repository.findById(id).orElseThrow(() -> new RuntimeException("not_found"));
        if (repository.existsByCodeAndIdNot(req.getCode(), id)) {
            throw new IllegalArgumentException("code_exists");
        }
        c.setCode(req.getCode());
        c.setTitle(req.getTitle());
        Course saved = repository.save(c);
        return new CourseResponse(saved.getId(), saved.getCode(), saved.getTitle());
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) throw new RuntimeException("not_found");
        repository.deleteById(id);
    }
}




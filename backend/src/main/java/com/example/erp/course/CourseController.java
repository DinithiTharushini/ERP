package com.example.erp.course;

import java.net.URI;
import java.util.List;

import com.example.erp.course.dto.CourseRequest;
import com.example.erp.course.dto.CourseResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @GetMapping
    public List<CourseResponse> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponse> get(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.get(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CourseRequest body) {
        try {
            CourseResponse created = service.create(body);
            return ResponseEntity.created(URI.create("/api/courses/" + created.getId())).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("code already exists");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody CourseRequest body) {
        try {
            return ResponseEntity.ok(service.update(id, body));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("code already exists");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}



package com.example.erp.student;

import com.example.erp.student.dto.StudentRequest;
import com.example.erp.student.dto.StudentResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping
    public List<StudentResponse> list(@RequestParam(name = "q", required = false) String q) {
        return service.list(q);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponse> get(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.get(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody StudentRequest req) {
        try {
            StudentResponse created = service.create(req);
            return ResponseEntity.created(URI.create("/api/students/" + created.getId())).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("index already exists");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody StudentRequest req) {
        try {
            return ResponseEntity.ok(service.update(id, req));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("index already exists");
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



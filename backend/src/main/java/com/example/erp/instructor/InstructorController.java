package com.example.erp.instructor;

import com.example.erp.instructor.dto.InstructorRequest;
import com.example.erp.instructor.dto.InstructorResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/instructors")
public class InstructorController {

    private final InstructorService service;

    public InstructorController(InstructorService service) {
        this.service = service;
    }

    @GetMapping
    public List<InstructorResponse> list(@RequestParam(name = "q", required = false) String q) {
        return service.list(q);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstructorResponse> get(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.get(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody InstructorRequest req) {
        try {
            InstructorResponse created = service.create(req);
            return ResponseEntity.created(URI.create("/api/instructors/" + created.getId())).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("staff id already exists");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody InstructorRequest req) {
        try {
            return ResponseEntity.ok(service.update(id, req));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("staff id already exists");
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



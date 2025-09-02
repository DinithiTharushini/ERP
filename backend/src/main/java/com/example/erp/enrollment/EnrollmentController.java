package com.example.erp.enrollment;

import com.example.erp.enrollment.dto.EnrollmentRequest;
import com.example.erp.enrollment.dto.EnrollmentResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    private final EnrollmentService service;

    public EnrollmentController(EnrollmentService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<EnrollmentResponse>> list(@RequestParam(required = false) Long studentId,
                                                        @RequestParam(required = false) Long offeringId) {
        if (studentId != null) return ResponseEntity.ok(service.listByStudent(studentId));
        if (offeringId != null) return ResponseEntity.ok(service.listByOffering(offeringId));
        return ResponseEntity.badRequest().build();
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody EnrollmentRequest req) {
        try {
            EnrollmentResponse created = service.create(req);
            return ResponseEntity.created(URI.create("/api/enrollments/" + created.getId())).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("duplicate");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
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



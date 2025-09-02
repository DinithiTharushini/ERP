package com.example.erp.grade;

import com.example.erp.grade.dto.GradeRequest;
import com.example.erp.grade.dto.GradeResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/grades")
public class GradeController {

    private final GradeService service;

    public GradeController(GradeService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<GradeResponse>> list(@RequestParam(required = false) Long offeringId,
                                                    @RequestParam(required = false) Long studentId) {
        if (offeringId != null) return ResponseEntity.ok(service.listByOffering(offeringId));
        if (studentId != null) return ResponseEntity.ok(service.listByStudent(studentId));
        return ResponseEntity.badRequest().build();
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody GradeRequest req) {
        try {
            GradeResponse created = service.create(req);
            return ResponseEntity.created(URI.create("/api/grades/" + created.getId())).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("grade exists");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody GradeRequest req) {
        try {
            return ResponseEntity.ok(service.update(id, req));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("grade exists");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}



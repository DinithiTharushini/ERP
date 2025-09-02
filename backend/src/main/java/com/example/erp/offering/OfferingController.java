package com.example.erp.offering;

import com.example.erp.offering.dto.OfferingRequest;
import com.example.erp.offering.dto.OfferingResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/offerings")
public class OfferingController {

    private final OfferingService service;

    public OfferingController(OfferingService service) {
        this.service = service;
    }

    @GetMapping
    public List<OfferingResponse> list(@RequestParam(name = "term", required = false) String term) {
        return service.list(term);
    }

    @GetMapping("/mine")
    public List<OfferingResponse> mine(@RequestParam(name = "term", required = false) String term, Authentication auth) {
        // simple mapping: username equals instructor staffId for demo
        String staffId = auth.getName();
        return service.listForInstructor(staffId, term);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OfferingResponse> get(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.get(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody OfferingRequest req) {
        try {
            OfferingResponse created = service.create(req);
            return ResponseEntity.created(URI.create("/api/offerings/" + created.getId())).body(created);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody OfferingRequest req) {
        try {
            return ResponseEntity.ok(service.update(id, req));
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



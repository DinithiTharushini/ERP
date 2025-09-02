package com.example.erp.enrollment;

import com.example.erp.enrollment.dto.EnrollmentRequest;
import com.example.erp.enrollment.dto.EnrollmentResponse;
import com.example.erp.offering.Offering;
import com.example.erp.offering.OfferingRepository;
import com.example.erp.student.Student;
import com.example.erp.student.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {
    private final EnrollmentRepository repository;
    private final StudentRepository studentRepository;
    private final OfferingRepository offeringRepository;

    public EnrollmentService(EnrollmentRepository repository, StudentRepository studentRepository, OfferingRepository offeringRepository) {
        this.repository = repository;
        this.studentRepository = studentRepository;
        this.offeringRepository = offeringRepository;
    }

    public List<EnrollmentResponse> listByStudent(Long studentId) {
        return repository.findByStudentId(studentId).stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<EnrollmentResponse> listByOffering(Long offeringId) {
        return repository.findByOfferingId(offeringId).stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public EnrollmentResponse create(EnrollmentRequest req) {
        if (repository.existsByStudentIdAndOfferingId(req.getStudentId(), req.getOfferingId())) {
            throw new IllegalArgumentException("duplicate");
        }
        Student student = studentRepository.findById(req.getStudentId()).orElseThrow(() -> new RuntimeException("student_not_found"));
        Offering offering = offeringRepository.findById(req.getOfferingId()).orElseThrow(() -> new RuntimeException("offering_not_found"));
        long enrolledCount = repository.countByOfferingIdAndStatus(offering.getId(), EnrollmentStatus.ENROLLED);
        EnrollmentStatus status = enrolledCount < offering.getCapacity() ? EnrollmentStatus.ENROLLED : EnrollmentStatus.WAITLISTED;
        Enrollment saved = repository.save(new Enrollment(student, offering, status));
        return toResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        Enrollment e = repository.findById(id).orElseThrow(() -> new RuntimeException("not_found"));
        Long offeringId = e.getOffering().getId();
        repository.delete(e);
        // promote first waitlisted if seat freed
        long enrolledCount = repository.countByOfferingIdAndStatus(offeringId, EnrollmentStatus.ENROLLED);
        Offering offering = offeringRepository.findById(offeringId).orElseThrow();
        if (enrolledCount < offering.getCapacity()) {
            repository.findFirstByOfferingIdAndStatusOrderByCreatedAtAsc(offeringId, EnrollmentStatus.WAITLISTED)
                    .ifPresent(w -> { w.setStatus(EnrollmentStatus.ENROLLED); repository.save(w); });
        }
    }

    private EnrollmentResponse toResponse(Enrollment e) {
        return new EnrollmentResponse(
                e.getId(),
                e.getStudent().getId(),
                e.getStudent().getFirstName() + " " + e.getStudent().getLastName(),
                e.getOffering().getId(),
                e.getOffering().getCourse().getCode(),
                e.getOffering().getTerm(),
                e.getStatus(),
                e.getCreatedAt()
        );
    }
}



package com.example.erp.grade;

import com.example.erp.enrollment.Enrollment;
import com.example.erp.enrollment.EnrollmentRepository;
import com.example.erp.grade.dto.GradeRequest;
import com.example.erp.grade.dto.GradeResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GradeService {
    private final GradeRepository gradeRepository;
    private final EnrollmentRepository enrollmentRepository;

    public GradeService(GradeRepository gradeRepository, EnrollmentRepository enrollmentRepository) {
        this.gradeRepository = gradeRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @Transactional
    public GradeResponse create(GradeRequest req) {
        if (gradeRepository.findByEnrollmentId(req.getEnrollmentId()).isPresent()) {
            throw new IllegalArgumentException("grade_exists");
        }
        Enrollment e = enrollmentRepository.findById(req.getEnrollmentId()).orElseThrow(() -> new RuntimeException("enrollment_not_found"));
        Grade saved = gradeRepository.save(new Grade(e, req.getLetter(), req.getPoints(), req.getRemarks()));
        return toResponse(saved);
    }

    @Transactional
    public GradeResponse update(Long id, GradeRequest req) {
        Grade g = gradeRepository.findById(id).orElseThrow(() -> new RuntimeException("not_found"));
        if (!g.getEnrollment().getId().equals(req.getEnrollmentId())) {
            // keep grade tied to same enrollment
            Enrollment e = enrollmentRepository.findById(req.getEnrollmentId()).orElseThrow(() -> new RuntimeException("enrollment_not_found"));
            // prevent duplicates for target enrollment
            gradeRepository.findByEnrollmentId(e.getId()).ifPresent(existing -> {
                if (!existing.getId().equals(id)) throw new IllegalArgumentException("grade_exists");
            });
            g.setEnrollment(e);
        }
        g.setLetter(req.getLetter());
        g.setPoints(req.getPoints());
        g.setRemarks(req.getRemarks());
        Grade saved = gradeRepository.save(g);
        return toResponse(saved);
    }

    public List<GradeResponse> listByOffering(Long offeringId) {
        return gradeRepository.findByEnrollment_Offering_Id(offeringId).stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<GradeResponse> listByStudent(Long studentId) {
        return gradeRepository.findByEnrollment_Student_Id(studentId).stream().map(this::toResponse).collect(Collectors.toList());
    }

    private GradeResponse toResponse(Grade g) {
        return new GradeResponse(
                g.getId(),
                g.getEnrollment().getId(),
                g.getEnrollment().getStudent().getFirstName() + " " + g.getEnrollment().getStudent().getLastName(),
                g.getEnrollment().getOffering().getCourse().getCode(),
                g.getEnrollment().getOffering().getTerm(),
                g.getLetter(),
                g.getPoints(),
                g.getRemarks()
        );
    }
}



package com.example.erp.offering;

import com.example.erp.course.Course;
import com.example.erp.course.CourseRepository;
import com.example.erp.instructor.Instructor;
import com.example.erp.instructor.InstructorRepository;
import com.example.erp.offering.dto.OfferingRequest;
import com.example.erp.offering.dto.OfferingResponse;
import com.example.erp.enrollment.EnrollmentRepository;
import com.example.erp.enrollment.EnrollmentStatus;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OfferingService {
    private final OfferingRepository offeringRepository;
    private final CourseRepository courseRepository;
    private final InstructorRepository instructorRepository;
    private final EnrollmentRepository enrollmentRepository;

    public OfferingService(OfferingRepository offeringRepository, CourseRepository courseRepository, InstructorRepository instructorRepository, EnrollmentRepository enrollmentRepository) {
        this.offeringRepository = offeringRepository;
        this.courseRepository = courseRepository;
        this.instructorRepository = instructorRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    public List<OfferingResponse> list(String term) {
        List<Offering> src = (term != null && !term.isBlank()) ? offeringRepository.findByTerm(term) : offeringRepository.findAll();
        return src.stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<OfferingResponse> listForInstructor(String staffId, String term) {
        List<Offering> src;
        if (term != null && !term.isBlank()) src = offeringRepository.findByInstructor_StaffIdAndTerm(staffId, term);
        else src = offeringRepository.findByInstructor_StaffId(staffId);
        return src.stream().map(this::toResponse).collect(Collectors.toList());
    }

    public OfferingResponse get(Long id) {
        Offering o = offeringRepository.findById(id).orElseThrow(() -> new RuntimeException("not_found"));
        return toResponse(o);
    }

    @Transactional
    public OfferingResponse create(OfferingRequest req) {
        Course c = courseRepository.findById(req.getCourseId()).orElseThrow(() -> new RuntimeException("course_not_found"));
        Instructor i = instructorRepository.findById(req.getInstructorId()).orElseThrow(() -> new RuntimeException("instructor_not_found"));
        Offering saved = offeringRepository.save(new Offering(req.getTerm(), c, i, req.getCapacity()));
        return toResponse(saved);
    }

    @Transactional
    public OfferingResponse update(Long id, OfferingRequest req) {
        Offering o = offeringRepository.findById(id).orElseThrow(() -> new RuntimeException("not_found"));
        Course c = courseRepository.findById(req.getCourseId()).orElseThrow(() -> new RuntimeException("course_not_found"));
        Instructor i = instructorRepository.findById(req.getInstructorId()).orElseThrow(() -> new RuntimeException("instructor_not_found"));
        o.setTerm(req.getTerm());
        o.setCourse(c);
        o.setInstructor(i);
        o.setCapacity(req.getCapacity());
        Offering saved = offeringRepository.save(o);
        return toResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        if (!offeringRepository.existsById(id)) throw new RuntimeException("not_found");
        offeringRepository.deleteById(id);
    }

    private OfferingResponse toResponse(Offering o) {
        long enrolled = enrollmentRepository.countByOfferingIdAndStatus(o.getId(), EnrollmentStatus.ENROLLED);
        long waitlisted = enrollmentRepository.countByOfferingIdAndStatus(o.getId(), EnrollmentStatus.WAITLISTED);
        return new OfferingResponse(
                o.getId(),
                o.getTerm(),
                o.getCourse().getId(),
                o.getCourse().getCode(),
                o.getCourse().getTitle(),
                o.getInstructor().getId(),
                o.getInstructor().getName(),
                o.getCapacity(),
                enrolled,
                waitlisted
        );
    }
}



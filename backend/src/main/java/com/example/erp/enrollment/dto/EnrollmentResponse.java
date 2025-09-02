package com.example.erp.enrollment.dto;

import com.example.erp.enrollment.EnrollmentStatus;
import java.time.Instant;

public class EnrollmentResponse {
    private Long id;
    private Long studentId;
    private String studentName;
    private Long offeringId;
    private String courseCode;
    private String term;
    private EnrollmentStatus status;
    private Instant createdAt;

    public EnrollmentResponse(Long id, Long studentId, String studentName, Long offeringId, String courseCode, String term, EnrollmentStatus status, Instant createdAt) {
        this.id = id;
        this.studentId = studentId;
        this.studentName = studentName;
        this.offeringId = offeringId;
        this.courseCode = courseCode;
        this.term = term;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public Long getStudentId() { return studentId; }
    public String getStudentName() { return studentName; }
    public Long getOfferingId() { return offeringId; }
    public String getCourseCode() { return courseCode; }
    public String getTerm() { return term; }
    public EnrollmentStatus getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }
}



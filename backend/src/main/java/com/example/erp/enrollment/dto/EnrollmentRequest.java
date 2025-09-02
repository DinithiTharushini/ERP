package com.example.erp.enrollment.dto;

import jakarta.validation.constraints.NotNull;

public class EnrollmentRequest {
    @NotNull
    private Long studentId;
    @NotNull
    private Long offeringId;

    public Long getStudentId() { return studentId; }
    public Long getOfferingId() { return offeringId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public void setOfferingId(Long offeringId) { this.offeringId = offeringId; }
}



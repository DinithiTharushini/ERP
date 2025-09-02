package com.example.erp.grade.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class GradeRequest {
    @NotNull
    private Long enrollmentId;

    @Size(max = 5)
    private String letter;

    private Double points;

    @Size(max = 500)
    private String remarks;

    public Long getEnrollmentId() { return enrollmentId; }
    public String getLetter() { return letter; }
    public Double getPoints() { return points; }
    public String getRemarks() { return remarks; }

    public void setEnrollmentId(Long enrollmentId) { this.enrollmentId = enrollmentId; }
    public void setLetter(String letter) { this.letter = letter; }
    public void setPoints(Double points) { this.points = points; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}



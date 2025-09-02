package com.example.erp.offering.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class OfferingRequest {
    @NotBlank
    private String term;

    @NotNull
    private Long courseId;

    @NotNull
    private Long instructorId;

    @NotNull
    @Min(1)
    private Integer capacity;

    public String getTerm() { return term; }
    public Long getCourseId() { return courseId; }
    public Long getInstructorId() { return instructorId; }
    public Integer getCapacity() { return capacity; }

    public void setTerm(String term) { this.term = term; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
    public void setInstructorId(Long instructorId) { this.instructorId = instructorId; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
}



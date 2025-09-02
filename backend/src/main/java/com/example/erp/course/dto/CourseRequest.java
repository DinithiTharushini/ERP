package com.example.erp.course.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CourseRequest {
    @NotBlank
    @Size(max = 20)
    private String code;

    @NotBlank
    @Size(max = 255)
    private String title;

    public String getCode() { return code; }
    public String getTitle() { return title; }
    public void setCode(String code) { this.code = code; }
    public void setTitle(String title) { this.title = title; }
}




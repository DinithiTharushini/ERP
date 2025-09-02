package com.example.erp.course.dto;

public class CourseResponse {
    private Long id;
    private String code;
    private String title;

    public CourseResponse(Long id, String code, String title) {
        this.id = id;
        this.code = code;
        this.title = title;
    }

    public Long getId() { return id; }
    public String getCode() { return code; }
    public String getTitle() { return title; }
}




package com.example.erp.instructor.dto;

public class InstructorResponse {
    private Long id;
    private String staffId;
    private String name;
    private String email;

    public InstructorResponse(Long id, String staffId, String name, String email) {
        this.id = id;
        this.staffId = staffId;
        this.name = name;
        this.email = email;
    }

    public Long getId() { return id; }
    public String getStaffId() { return staffId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}



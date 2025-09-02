package com.example.erp.instructor.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class InstructorRequest {
    @NotBlank
    @Size(max = 50)
    private String staffId;

    @NotBlank
    @Size(max = 150)
    private String name;

    @NotBlank
    @Email
    @Size(max = 255)
    private String email;

    public String getStaffId() { return staffId; }
    public String getName() { return name; }
    public String getEmail() { return email; }

    public void setStaffId(String staffId) { this.staffId = staffId; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
}



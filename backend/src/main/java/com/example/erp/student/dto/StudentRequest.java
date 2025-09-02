package com.example.erp.student.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class StudentRequest {
    @NotBlank
    @Size(max = 50)
    private String indexNumber;

    @NotBlank
    @Size(max = 100)
    private String firstName;

    @NotBlank
    @Size(max = 100)
    private String lastName;

    @NotBlank
    @Email
    @Size(max = 255)
    private String email;

    public String getIndexNumber() { return indexNumber; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }

    public void setIndexNumber(String indexNumber) { this.indexNumber = indexNumber; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setEmail(String email) { this.email = email; }
}



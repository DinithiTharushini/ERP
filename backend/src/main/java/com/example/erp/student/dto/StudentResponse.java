package com.example.erp.student.dto;

public class StudentResponse {
    private Long id;
    private String indexNumber;
    private String firstName;
    private String lastName;
    private String email;

    public StudentResponse(Long id, String indexNumber, String firstName, String lastName, String email) {
        this.id = id;
        this.indexNumber = indexNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public Long getId() { return id; }
    public String getIndexNumber() { return indexNumber; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
}



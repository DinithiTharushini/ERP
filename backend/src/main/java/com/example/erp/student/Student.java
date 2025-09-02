package com.example.erp.student;

import jakarta.persistence.*;

@Entity
@Table(name = "students", uniqueConstraints = @UniqueConstraint(columnNames = "index_number"))
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "index_number", nullable = false, length = 50)
    private String indexNumber;

    @Column(nullable = false, length = 100)
    private String firstName;

    @Column(nullable = false, length = 100)
    private String lastName;

    @Column(nullable = false, length = 255)
    private String email;

    public Student() {}

    public Student(String indexNumber, String firstName, String lastName, String email) {
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

    public void setId(Long id) { this.id = id; }
    public void setIndexNumber(String indexNumber) { this.indexNumber = indexNumber; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setEmail(String email) { this.email = email; }
}



package com.example.erp.instructor;

import jakarta.persistence.*;

@Entity
@Table(name = "instructors", uniqueConstraints = @UniqueConstraint(columnNames = "staff_id"))
public class Instructor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "staff_id", nullable = false, length = 50)
    private String staffId;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 255)
    private String email;

    public Instructor() {}

    public Instructor(String staffId, String name, String email) {
        this.staffId = staffId;
        this.name = name;
        this.email = email;
    }

    public Long getId() { return id; }
    public String getStaffId() { return staffId; }
    public String getName() { return name; }
    public String getEmail() { return email; }

    public void setId(Long id) { this.id = id; }
    public void setStaffId(String staffId) { this.staffId = staffId; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
}



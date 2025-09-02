package com.example.erp.course;

import jakarta.persistence.*;

@Entity
@Table(name = "courses", uniqueConstraints = @UniqueConstraint(columnNames = "code"))
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String code;

    @Column(nullable = false, length = 255)
    private String title;

    public Course() {}

    public Course(String code, String title) {
        this.code = code;
        this.title = title;
    }

    public Long getId() { return id; }
    public String getCode() { return code; }
    public String getTitle() { return title; }

    public void setId(Long id) { this.id = id; }
    public void setCode(String code) { this.code = code; }
    public void setTitle(String title) { this.title = title; }
}



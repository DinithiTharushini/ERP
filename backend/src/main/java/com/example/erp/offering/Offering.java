package com.example.erp.offering;

import com.example.erp.course.Course;
import com.example.erp.instructor.Instructor;
import jakarta.persistence.*;

@Entity
@Table(name = "offerings")
public class Offering {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String term;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;

    @Column(nullable = false)
    private Integer capacity;

    public Offering() {}

    public Offering(String term, Course course, Instructor instructor, Integer capacity) {
        this.term = term;
        this.course = course;
        this.instructor = instructor;
        this.capacity = capacity;
    }

    public Long getId() { return id; }
    public String getTerm() { return term; }
    public Course getCourse() { return course; }
    public Instructor getInstructor() { return instructor; }
    public Integer getCapacity() { return capacity; }

    public void setId(Long id) { this.id = id; }
    public void setTerm(String term) { this.term = term; }
    public void setCourse(Course course) { this.course = course; }
    public void setInstructor(Instructor instructor) { this.instructor = instructor; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
}



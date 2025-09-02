package com.example.erp.enrollment;

import com.example.erp.offering.Offering;
import com.example.erp.student.Student;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "enrollments", uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "offering_id"}))
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "offering_id")
    private Offering offering;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EnrollmentStatus status;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    public void onCreate() { if (createdAt == null) createdAt = Instant.now(); }

    public Enrollment() {}

    public Enrollment(Student student, Offering offering, EnrollmentStatus status) {
        this.student = student;
        this.offering = offering;
        this.status = status;
    }

    public Long getId() { return id; }
    public Student getStudent() { return student; }
    public Offering getOffering() { return offering; }
    public EnrollmentStatus getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setStudent(Student student) { this.student = student; }
    public void setOffering(Offering offering) { this.offering = offering; }
    public void setStatus(EnrollmentStatus status) { this.status = status; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}



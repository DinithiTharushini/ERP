package com.example.erp.grade;

import com.example.erp.enrollment.Enrollment;
import jakarta.persistence.*;

@Entity
@Table(name = "grades", uniqueConstraints = @UniqueConstraint(columnNames = {"enrollment_id"}))
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "enrollment_id")
    private Enrollment enrollment;

    @Column(length = 5)
    private String letter;

    private Double points;

    @Column(length = 500)
    private String remarks;

    public Grade() {}

    public Grade(Enrollment enrollment, String letter, Double points, String remarks) {
        this.enrollment = enrollment;
        this.letter = letter;
        this.points = points;
        this.remarks = remarks;
    }

    public Long getId() { return id; }
    public Enrollment getEnrollment() { return enrollment; }
    public String getLetter() { return letter; }
    public Double getPoints() { return points; }
    public String getRemarks() { return remarks; }

    public void setId(Long id) { this.id = id; }
    public void setEnrollment(Enrollment enrollment) { this.enrollment = enrollment; }
    public void setLetter(String letter) { this.letter = letter; }
    public void setPoints(Double points) { this.points = points; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}



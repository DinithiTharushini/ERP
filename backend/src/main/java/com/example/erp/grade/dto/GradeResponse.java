package com.example.erp.grade.dto;

public class GradeResponse {
    private Long id;
    private Long enrollmentId;
    private String studentName;
    private String courseCode;
    private String term;
    private String letter;
    private Double points;
    private String remarks;

    public GradeResponse(Long id, Long enrollmentId, String studentName, String courseCode, String term, String letter, Double points, String remarks) {
        this.id = id;
        this.enrollmentId = enrollmentId;
        this.studentName = studentName;
        this.courseCode = courseCode;
        this.term = term;
        this.letter = letter;
        this.points = points;
        this.remarks = remarks;
    }

    public Long getId() { return id; }
    public Long getEnrollmentId() { return enrollmentId; }
    public String getStudentName() { return studentName; }
    public String getCourseCode() { return courseCode; }
    public String getTerm() { return term; }
    public String getLetter() { return letter; }
    public Double getPoints() { return points; }
    public String getRemarks() { return remarks; }
}



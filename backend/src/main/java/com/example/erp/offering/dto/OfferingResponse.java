package com.example.erp.offering.dto;

public class OfferingResponse {
    private Long id;
    private String term;
    private Long courseId;
    private String courseCode;
    private String courseTitle;
    private Long instructorId;
    private String instructorName;
    private Integer capacity;
    private Long enrolledCount;
    private Long waitlistedCount;

    public OfferingResponse(Long id, String term, Long courseId, String courseCode, String courseTitle,
                            Long instructorId, String instructorName, Integer capacity,
                            Long enrolledCount, Long waitlistedCount) {
        this.id = id;
        this.term = term;
        this.courseId = courseId;
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.instructorId = instructorId;
        this.instructorName = instructorName;
        this.capacity = capacity;
        this.enrolledCount = enrolledCount;
        this.waitlistedCount = waitlistedCount;
    }

    public Long getId() { return id; }
    public String getTerm() { return term; }
    public Long getCourseId() { return courseId; }
    public String getCourseCode() { return courseCode; }
    public String getCourseTitle() { return courseTitle; }
    public Long getInstructorId() { return instructorId; }
    public String getInstructorName() { return instructorName; }
    public Integer getCapacity() { return capacity; }
    public Long getEnrolledCount() { return enrolledCount; }
    public Long getWaitlistedCount() { return waitlistedCount; }
}



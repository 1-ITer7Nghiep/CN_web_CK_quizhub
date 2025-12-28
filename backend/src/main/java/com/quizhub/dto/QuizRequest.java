package com.quizhub.dto;

import java.util.List;

public class QuizRequest {
    private String title;
    private String description;
    private Integer duration;
    private Long createdBy;
    private List<QuestionRequest> questions;

    public QuizRequest() {
    }

    public QuizRequest(String title, String description, Integer duration, Long createdBy,
            List<QuestionRequest> questions) {
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.createdBy = createdBy;
        this.questions = questions;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public List<QuestionRequest> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionRequest> questions) {
        this.questions = questions;
    }
}

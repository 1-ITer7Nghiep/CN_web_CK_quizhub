package com.quizhub.dto;

public class ResultRequest {
    private Long userId;
    private Long quizId;
    private Double score;
    private String quizTitle;

    public ResultRequest() {
    }

    public ResultRequest(Long userId, Long quizId, Double score, String quizTitle) {
        this.userId = userId;
        this.quizId = quizId;
        this.score = score;
        this.quizTitle = quizTitle;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getQuizTitle() {
        return quizTitle;
    }

    public void setQuizTitle(String quizTitle) {
        this.quizTitle = quizTitle;
    }
}

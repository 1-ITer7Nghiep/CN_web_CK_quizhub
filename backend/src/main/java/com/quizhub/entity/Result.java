package com.quizhub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "results")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long quizId;

    @Column(nullable = false)
    private Double score; // percentage (0-100)

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column
    private String quizTitle; // For display purposes

    public Result() {
    }

    public Result(Long id, Long userId, Long quizId, Double score, LocalDateTime timestamp, String quizTitle) {
        this.id = id;
        this.userId = userId;
        this.quizId = quizId;
        this.score = score;
        this.timestamp = timestamp;
        this.quizTitle = quizTitle;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getQuizTitle() {
        return quizTitle;
    }

    public void setQuizTitle(String quizTitle) {
        this.quizTitle = quizTitle;
    }
}

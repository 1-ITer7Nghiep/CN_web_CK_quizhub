package com.quizhub.repository;

import com.quizhub.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByQuizId(Long quizId);

    List<Report> findByStatus(String status);
}

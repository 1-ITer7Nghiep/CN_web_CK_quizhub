package com.quizhub.repository;

import com.quizhub.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByUserIdOrderByTimestampDesc(Long userId);

    List<Result> findByQuizId(Long quizId);
}

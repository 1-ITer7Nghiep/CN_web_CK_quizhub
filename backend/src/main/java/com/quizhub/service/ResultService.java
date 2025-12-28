package com.quizhub.service;

import com.quizhub.dto.ResultRequest;
import com.quizhub.entity.Result;
import com.quizhub.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    public Result saveResult(ResultRequest request) {
        Result result = new Result();
        result.setUserId(request.getUserId());
        result.setQuizId(request.getQuizId());
        result.setScore(request.getScore());
        result.setQuizTitle(request.getQuizTitle());
        result.setTimestamp(LocalDateTime.now());

        return resultRepository.save(result);
    }

    public List<Result> getResultsByUserId(Long userId) {
        return resultRepository.findByUserIdOrderByTimestampDesc(userId);
    }

    public List<Result> getResultsByQuizId(Long quizId) {
        return resultRepository.findByQuizId(quizId);
    }
}

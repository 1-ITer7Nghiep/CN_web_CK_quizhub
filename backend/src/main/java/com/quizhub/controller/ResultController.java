package com.quizhub.controller;

import com.quizhub.dto.ResultRequest;
import com.quizhub.entity.Result;
import com.quizhub.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/result")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @PostMapping("/save")
    public ResponseEntity<Result> saveResult(@RequestBody ResultRequest request) {
        return ResponseEntity.ok(resultService.saveResult(request));
    }

    @GetMapping("/user/{userId}")
    public List<Result> getUserResults(@PathVariable Long userId) {
        return resultService.getResultsByUserId(userId);
    }

    @GetMapping("/quiz/{quizId}")
    public List<Result> getQuizResults(@PathVariable Long quizId) {
        return resultService.getResultsByQuizId(quizId);
    }
}

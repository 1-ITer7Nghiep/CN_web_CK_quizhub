package com.quizhub.controller;

import com.quizhub.dto.QuizRequest;
import com.quizhub.entity.Quiz;
import com.quizhub.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    @GetMapping("/user/{userId}")
    public List<Quiz> getQuizzesByUser(@PathVariable Long userId) {
        return quizService.getQuizzesByCreator(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(quizService.getQuizById(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody QuizRequest request) {
        return ResponseEntity.ok(quizService.createQuiz(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id, @RequestBody QuizRequest request) {
        try {
            return ResponseEntity.ok(quizService.updateQuiz(id, request));
        } catch (

        Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long id, @RequestParam Long userId,
            @RequestParam boolean isAdmin) {
        Quiz quiz = quizService.getQuizById(id);

        if (quiz.getCreatedBy().equals(userId) || isAdmin) {
            quizService.deleteQuiz(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(403).body("Unauthorized to delete this quiz");
        }
    }

    @Autowired
    private com.quizhub.service.FileParsingService fileParsingService;

    @PostMapping("/parse-file")
    public ResponseEntity<?> parseFile(@RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        try {
            List<com.quizhub.dto.QuestionRequest> questions = fileParsingService.parseFile(file);
            return ResponseEntity.ok(questions);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error parsing file: " + e.getMessage());
        }
    }
}

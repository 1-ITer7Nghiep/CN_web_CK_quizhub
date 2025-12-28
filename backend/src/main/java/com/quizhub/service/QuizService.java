package com.quizhub.service;

import com.quizhub.dto.QuestionRequest;
import com.quizhub.dto.QuizRequest;
import com.quizhub.entity.Question;
import com.quizhub.entity.Quiz;
import com.quizhub.repository.QuestionRepository;
import com.quizhub.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public List<Quiz> getQuizzesByCreator(Long userId) {
        return quizRepository.findByCreatedBy(userId);
    }

    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id).orElseThrow(() -> new RuntimeException("Quiz not found"));
    }

    @Transactional
    public Quiz createQuiz(QuizRequest request) {
        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setDuration(request.getDuration());
        quiz.setCreatedBy(request.getCreatedBy());
        quiz.setStatus("APPROVED"); // Auto-approve for demo

        List<Question> questions = new ArrayList<>();
        if (request.getQuestions() != null) {
            for (QuestionRequest qRequest : request.getQuestions()) {
                Question question = new Question();
                question.setQuestionText(qRequest.getQuestionText());
                question.setOption1(qRequest.getOption1());
                question.setOption2(qRequest.getOption2());
                question.setOption3(qRequest.getOption3());
                question.setOption4(qRequest.getOption4());
                question.setCorrectAnswer(qRequest.getCorrectAnswer());
                question.setQuiz(quiz);
                questions.add(question);
            }
        }

        quiz.setQuestions(questions);
        return quizRepository.save(quiz);
    }

    @Transactional
    public Quiz updateQuiz(Long id, QuizRequest request) {
        Quiz quiz = getQuizById(id);
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setDuration(request.getDuration());

        // Simple update: Clear old questions and add new ones
        // In a real app, you might want to update existing questions to preserve IDs
        List<Question> oldQuestions = quiz.getQuestions();
        if (oldQuestions != null) {
            oldQuestions.clear();
        } else {
            oldQuestions = new ArrayList<>();
        }

        if (request.getQuestions() != null) {
            for (QuestionRequest qRequest : request.getQuestions()) {
                Question question = new Question();
                question.setQuestionText(qRequest.getQuestionText());
                question.setOption1(qRequest.getOption1());
                question.setOption2(qRequest.getOption2());
                question.setOption3(qRequest.getOption3());
                question.setOption4(qRequest.getOption4());
                question.setCorrectAnswer(qRequest.getCorrectAnswer());
                question.setQuiz(quiz);
                oldQuestions.add(question);
            }
        }

        quiz.setQuestions(oldQuestions);
        return quizRepository.save(quiz);
    }

    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }
}

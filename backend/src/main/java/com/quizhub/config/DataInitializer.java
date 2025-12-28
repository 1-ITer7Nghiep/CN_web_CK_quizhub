package com.quizhub.config;

import com.quizhub.dto.QuestionRequest;
import com.quizhub.dto.QuizRequest;
import com.quizhub.dto.RegisterRequest;
import com.quizhub.service.AuthService;
import com.quizhub.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AuthService authService;

    @Autowired
    private QuizService quizService;

    @Override
    public void run(String... args) throws Exception {
        // Create Admin User
        try {
            authService.register(new RegisterRequest("admin", "admin", "ADMIN"));
            System.out.println("Admin user created: admin/admin");
        } catch (Exception e) {
            System.out.println("Admin user already exists");
        }

        // Create Normal User
        try {
            authService.register(new RegisterRequest("user1", "123456", "USER"));
            System.out.println("Normal user created: user1/123456");
        } catch (Exception e) {
            System.out.println("Normal user already exists");
        }

        // Create Sample Quiz 1: Java Basics
        if (quizService.getAllQuizzes().isEmpty()) {
            QuizRequest javaQuiz = new QuizRequest();
            javaQuiz.setTitle("Java Basics");
            javaQuiz.setDescription("Fundamental concepts of Java Programming");
            javaQuiz.setDuration(10);
            javaQuiz.setCreatedBy(1L);

            List<QuestionRequest> javaQuestions = new ArrayList<>();

            QuestionRequest q1 = new QuestionRequest();
            q1.setQuestionText("What is the correct way to declare a main method in Java?");
            q1.setOption1("public void main(String[] args)");
            q1.setOption2("public static void main(String[] args)");
            q1.setOption3("private static void main(String[] args)");
            q1.setOption4("void main(String args)");
            q1.setCorrectAnswer(2);
            javaQuestions.add(q1);

            QuestionRequest q2 = new QuestionRequest();
            q2.setQuestionText("Which data type is used to create a variable that should store text?");
            q2.setOption1("String");
            q2.setOption2("Char");
            q2.setOption3("Txt");
            q2.setOption4("string");
            q2.setCorrectAnswer(1);
            javaQuestions.add(q2);

            javaQuiz.setQuestions(javaQuestions);
            quizService.createQuiz(javaQuiz);

            // Create Sample Quiz 2: Spring Boot
            QuizRequest springQuiz = new QuizRequest();
            springQuiz.setTitle("Spring Boot Fundamentals");
            springQuiz.setDescription("Introduction to Spring Boot framework");
            springQuiz.setDuration(15);
            springQuiz.setCreatedBy(1L);

            List<QuestionRequest> springQuestions = new ArrayList<>();

            QuestionRequest sq1 = new QuestionRequest();
            sq1.setQuestionText("Which annotation is used to start a Spring Boot application?");
            sq1.setOption1("@SpringBootApplication");
            sq1.setOption2("@StartSpring");
            sq1.setOption3("@ApplicationStart");
            sq1.setOption4("@SpringApp");
            sq1.setCorrectAnswer(1);
            springQuestions.add(sq1);

            springQuiz.setQuestions(springQuestions);
            quizService.createQuiz(springQuiz);

            System.out.println("Sample quizzes created");
        }
    }
}

package com.quizhub.service;

import com.quizhub.dto.QuestionRequest;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class FileParsingService {

    public List<QuestionRequest> parseFile(MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename();
        if (filename == null)
            return new ArrayList<>();

        String text = "";
        if (filename.toLowerCase().endsWith(".pdf")) {
            text = parsePdf(file);
        } else if (filename.toLowerCase().endsWith(".docx")) {
            text = parseDocx(file);
        } else {
            throw new IllegalArgumentException("Unsupported file type. Please use .pdf or .docx");
        }

        return parseTextToQuestions(text);
    }

    private String parsePdf(MultipartFile file) throws IOException {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }

    private String parseDocx(MultipartFile file) throws IOException {
        try (XWPFDocument document = new XWPFDocument(file.getInputStream())) {
            StringBuilder text = new StringBuilder();
            for (XWPFParagraph p : document.getParagraphs()) {
                text.append(p.getText()).append("\n");
            }
            return text.toString();
        }
    }

    private List<QuestionRequest> parseTextToQuestions(String text) {
        List<QuestionRequest> questions = new ArrayList<>();
        String[] lines = text.split("\n");
        QuestionRequest currentQuestion = null;

        System.out.println("Parsing text: " + text.substring(0, Math.min(text.length(), 200))); // Debug log

        // Regex patterns (Enhanced flexibility + Unicode support)
        // Matches: "Câu 1:", "Câu 1.", "Question 1:", "1."
        // (?U) enables Unicode-aware character classes
        Pattern questionPattern = Pattern.compile("(?U)^(?:Câu|Question|Bài|\\d+)[\\s:.)]*(.*)",
                Pattern.CASE_INSENSITIVE);

        // Matches: "A.", "A)", "a.", "a)", "A " (space)
        Pattern optionAPattern = Pattern.compile("(?U)^[A](?:[:.)]|\\s+)\\s*(.*)", Pattern.CASE_INSENSITIVE);
        Pattern optionBPattern = Pattern.compile("(?U)^[B](?:[:.)]|\\s+)\\s*(.*)", Pattern.CASE_INSENSITIVE);
        Pattern optionCPattern = Pattern.compile("(?U)^[C](?:[:.)]|\\s+)\\s*(.*)", Pattern.CASE_INSENSITIVE);
        Pattern optionDPattern = Pattern.compile("(?U)^[D](?:[:.)]|\\s+)\\s*(.*)", Pattern.CASE_INSENSITIVE);

        // Matches: "Đáp án: A", "Answer: A", "Đáp án A", "Dap an: A"
        Pattern answerPattern = Pattern.compile("(?U)^(?:Đáp án|Answer|Dap an|KQ)[:\\s]*([A-D])",
                Pattern.CASE_INSENSITIVE);

        for (String line : lines) {
            line = line.trim();
            if (line.isEmpty())
                continue;

            Matcher qMatcher = questionPattern.matcher(line);

            boolean isExplicitQuestion = line.toLowerCase().startsWith("câu")
                    || line.toLowerCase().startsWith("question") || line.toLowerCase().startsWith("bài");

            // Heuristic: If it looks like "1. content", it's a question.
            boolean isNumberedQuestion = line.matches("(?U)^\\d+[:.].*");

            if ((qMatcher.find() && (isExplicitQuestion || isNumberedQuestion))
                    || (currentQuestion == null && qMatcher.find())) {

                if (currentQuestion != null) {
                    if (isValid(currentQuestion)) {
                        questions.add(currentQuestion);
                    } else {
                        System.out.println(
                                "Skipping invalid question. Missing fields: " + getMissingFields(currentQuestion));
                    }
                }

                currentQuestion = new QuestionRequest();
                String qText = qMatcher.group(1).trim();
                if (qText.isEmpty())
                    qText = line;
                currentQuestion.setQuestionText(qText);
                System.out.println("Processing Question: " + qText);
                continue;
            }

            if (currentQuestion != null) {
                Matcher aMatcher = optionAPattern.matcher(line);
                if (aMatcher.find()) {
                    currentQuestion.setOption1(aMatcher.group(1).trim());
                    continue;
                }

                Matcher bMatcher = optionBPattern.matcher(line);
                if (bMatcher.find()) {
                    currentQuestion.setOption2(bMatcher.group(1).trim());
                    continue;
                }

                Matcher cMatcher = optionCPattern.matcher(line);
                if (cMatcher.find()) {
                    currentQuestion.setOption3(cMatcher.group(1).trim());
                    continue;
                }

                Matcher dMatcher = optionDPattern.matcher(line);
                if (dMatcher.find()) {
                    currentQuestion.setOption4(dMatcher.group(1).trim());
                    continue;
                }

                Matcher ansMatcher = answerPattern.matcher(line);
                if (ansMatcher.find()) {
                    String ansChar = ansMatcher.group(1).toUpperCase();
                    int ansIndex = 1;
                    switch (ansChar) {
                        case "A":
                            ansIndex = 1;
                            break;
                        case "B":
                            ansIndex = 2;
                            break;
                        case "C":
                            ansIndex = 3;
                            break;
                        case "D":
                            ansIndex = 4;
                            break;
                    }
                    currentQuestion.setCorrectAnswer(ansIndex);
                    System.out.println("Found Answer: " + ansChar);
                }
            }
        }

        // Add the last question
        if (currentQuestion != null) {
            if (isValid(currentQuestion)) {
                questions.add(currentQuestion);
            } else {
                System.out.println("Skipping LAST question. Missing fields: " + getMissingFields(currentQuestion));
            }
        }

        System.out.println("Total questions parsed: " + questions.size());
        return questions;
    }

    private boolean isValid(QuestionRequest q) {
        return q.getQuestionText() != null && !q.getQuestionText().isEmpty() &&
                q.getOption1() != null && !q.getOption1().isEmpty() &&
                q.getOption2() != null && !q.getOption2().isEmpty() &&
                q.getOption3() != null && !q.getOption3().isEmpty() &&
                q.getOption4() != null && !q.getOption4().isEmpty() &&
                q.getCorrectAnswer() != null;
    }

    private String getMissingFields(QuestionRequest q) {
        List<String> missing = new ArrayList<>();
        if (q.getQuestionText() == null || q.getQuestionText().isEmpty())
            missing.add("Text");
        if (q.getOption1() == null || q.getOption1().isEmpty())
            missing.add("Option A");
        if (q.getOption2() == null || q.getOption2().isEmpty())
            missing.add("Option B");
        if (q.getOption3() == null || q.getOption3().isEmpty())
            missing.add("Option C");
        if (q.getOption4() == null || q.getOption4().isEmpty())
            missing.add("Option D");
        if (q.getCorrectAnswer() == null)
            missing.add("Answer");
        return String.join(", ", missing);
    }
}

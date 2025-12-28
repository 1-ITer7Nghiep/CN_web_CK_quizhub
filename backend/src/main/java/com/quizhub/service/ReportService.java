package com.quizhub.service;

import com.quizhub.entity.Report;
import com.quizhub.entity.User;
import com.quizhub.entity.Quiz;
import com.quizhub.dto.ReportRequest;
import com.quizhub.repository.ReportRepository;
import com.quizhub.repository.UserRepository;
import com.quizhub.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private NotificationService notificationService;

    public Report createReport(ReportRequest request) {
        Report report = new Report();
        report.setQuizId(request.getQuizId());
        report.setReporterId(request.getReporterId());
        report.setReason(request.getReason());
        report.setStatus("PENDING");

        Report savedReport = reportRepository.save(report);
        System.out.println("Report created: " + savedReport.getId()); // Debug Log

        try {
            // Fetch details for message
            String reporterName = userRepository.findById(request.getReporterId())
                    .map(User::getUsername)
                    .orElse("Unknown User");
            String quizTitle = quizRepository.findById(request.getQuizId())
                    .map(Quiz::getTitle)
                    .orElse("Unknown Quiz");

            // Notify Admins
            notificationService.notifyAllAdmins(
                    "Báo cáo mới: " + reporterName + " đã báo cáo quiz '" + quizTitle + "' (ID: "
                            + request.getQuizId() + ")",
                    "REPORT_CREATED",
                    savedReport.getId());
        } catch (Exception e) {
            System.err.println("Error sending notification for new report: " + e.getMessage());
            e.printStackTrace();
        }

        return savedReport;
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public List<Report> getReportsByStatus(String status) {
        return reportRepository.findByStatus(status);
    }

    public Report updateReportStatus(Long id, String status) {
        Report report = reportRepository.findById(id).orElseThrow();
        report.setStatus(status);
        Report updatedReport = reportRepository.save(report);

        try {
            // Fetch details for message
            String quizTitle = quizRepository.findById(updatedReport.getQuizId())
                    .map(Quiz::getTitle)
                    .orElse("Unknown Quiz");

            // Translate status
            String statusVN = "Đã xử lý";
            if ("RESOLVED".equals(status)) {
                statusVN = "Đã được Duyệt (Quiz đã bị xóa)";
            } else if ("REJECTED".equals(status)) {
                statusVN = "Đã bị Từ chối (Quiz vẫn giữ nguyên)";
            }

            // Notify Reporter
            notificationService.createNotification(
                    updatedReport.getReporterId(),
                    "Báo cáo của bạn về quiz '" + quizTitle + "' đã có kết quả: " + statusVN,
                    "REPORT_UPDATED",
                    updatedReport.getId());

        } catch (Exception e) {
            System.err.println("Error sending notification for report update: " + e.getMessage());
            e.printStackTrace();
        }

        // Auto-delete if resolved or rejected
        if ("RESOLVED".equals(status) || "REJECTED".equals(status)) {
            try {
                reportRepository.delete(updatedReport);
            } catch (Exception e) {
                System.err.println("Error deleting report: " + e.getMessage());
            }
        }

        return updatedReport;
    }
}

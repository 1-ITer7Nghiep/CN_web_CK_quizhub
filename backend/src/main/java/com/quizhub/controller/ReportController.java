package com.quizhub.controller;

import com.quizhub.dto.ReportRequest;
import com.quizhub.entity.Report;
import com.quizhub.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping
    public Report createReport(@RequestBody ReportRequest request) {
        return reportService.createReport(request);
    }

    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Report> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(reportService.updateReportStatus(id, status));
    }
}

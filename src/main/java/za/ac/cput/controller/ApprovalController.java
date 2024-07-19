package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.TutorApplication;
import za.ac.cput.service.ApprovalService;

@RestController
@RequestMapping("/api/approval")
public class ApprovalController {

    private final ApprovalService approvalService;

    @Autowired
    public ApprovalController(ApprovalService approvalService) {
        this.approvalService = approvalService;
    }

    @PostMapping("/approve/{id}")
    public ResponseEntity<TutorApplication> approveApplication(@PathVariable Long id) {
        TutorApplication approvedApplication = approvalService.approveApplication(id);
        return ResponseEntity.ok(approvedApplication);
    }

    @PostMapping("/decline/{id}")
    public ResponseEntity<TutorApplication> declineApplication(@PathVariable Long id) {
        TutorApplication declinedApplication = approvalService.rejectApplication(id);
        return ResponseEntity.ok(declinedApplication);
    }
}

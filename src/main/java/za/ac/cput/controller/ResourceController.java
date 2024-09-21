package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import za.ac.cput.domain.Resource;
import za.ac.cput.service.ResourceService;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/resource")
public class ResourceController {
    private final ResourceService resourceService;

    @Autowired
    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("type") String type, @RequestParam("tutorEmail") String tutorEmail) {
        try {
            resourceService.saveFile(file, type, tutorEmail);
            return ResponseEntity.ok("File uploaded successfully");
        } catch (Exception e) {
            if (e.getMessage().equals("Tutor not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tutor not found");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Resource>> getFiles(@RequestParam String tutorEmail) {
        List<Resource> resource = resourceService.findByTutorEmail(tutorEmail);
        return ResponseEntity.ok(resource);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFile(@PathVariable Long id) {
        try {
            resourceService.deleteFile(id);
            return ResponseEntity.ok("File deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting file: " + e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateFile(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            resourceService.updateFile(id, file);
            return ResponseEntity.ok("File updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating file: " + e.getMessage());
        }
    }
}
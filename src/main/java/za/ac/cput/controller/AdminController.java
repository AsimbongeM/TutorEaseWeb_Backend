package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Admin;
import za.ac.cput.service.AdminService;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    /**
     * Create a new Admin
     * @param admin Admin object to be created
     * @return ResponseEntity with created Admin and status
     */
    @PostMapping
    public ResponseEntity<Admin> createAdmin(@Valid @RequestBody Admin admin) {
        Admin createdAdmin = adminService.create(admin);
        return new ResponseEntity<>(createdAdmin, HttpStatus.CREATED);
    }

    /**
     * Login an Admin
     * @param loginRequest LoginRequest object with username and password
     * @return ResponseEntity with login status
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        Admin admin = adminService.readByUsername(loginRequest.getUsername());
        if (admin != null && admin.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    /**
     * Get an Admin by ID
     * @param adminId ID of the Admin to retrieve
     * @return ResponseEntity with Admin or not found status
     */
    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdmin(@PathVariable("id") Long adminId) {
        Admin admin = adminService.read(adminId);
        if (admin != null) {
            return new ResponseEntity<>(admin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Update an existing Admin
     * @param adminId ID of the Admin to update
     * @param admin Admin object with updated information
     * @return ResponseEntity with updated Admin or not found status
     */
    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable("id") Long adminId, @Valid @RequestBody Admin admin) {
        Admin existingAdmin = adminService.read(adminId);
        if (admin.getId() == null || !admin.getId().equals(adminId)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Admin updatedAdmin = new Admin.Builder().copy(existingAdmin)
                .setUsername(admin.getUsername())
                .setPassword(admin.getPassword())
                .build();
        updatedAdmin= adminService.update(updatedAdmin);
        if (updatedAdmin != null) {
            return new ResponseEntity<>(updatedAdmin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Delete an Admin by ID
     * @param adminId ID of the Admin to delete
     * @return ResponseEntity with no content status
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable("id") Long adminId) {
        Admin existingAdmin = adminService.read(adminId);
        if (existingAdmin != null) {
            adminService.delete(adminId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public static class LoginRequest {
        private String username;
        private String password;

        // Getters and setters
        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}

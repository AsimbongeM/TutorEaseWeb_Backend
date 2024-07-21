package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Admin;
import za.ac.cput.service.AdminService;
import jakarta.validation.Valid;
/**
 * AdminLoginController.java
 * This is the controller class for handling admin.
 * Date: 19 July 2024
 */
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
     * return ResponseEntity with created Admin and status
     */
    @PostMapping
    public ResponseEntity<Admin> createAdmin(@Valid @RequestBody Admin admin) {
        Admin createdAdmin = adminService.create(admin);
        return new ResponseEntity<>(createdAdmin, HttpStatus.CREATED);
    }

    /**
     * Get an Admin by ID
     * return ResponseEntity with Admin or not found status
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
     * ID of the Admin to update as a parameter
     * return ResponseEntity with updated Admin or not found status
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
                .setFirstName(admin.getFirstName())
                .setLastName(admin.getLastName())
                .setEmail(admin.getEmail())
                .setCellphoneNumber(admin.getCellphoneNumber())
                .build();
        updatedAdmin = adminService.update(updatedAdmin);
        if (updatedAdmin != null) {
            return new ResponseEntity<>(updatedAdmin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Delete an Admin by ID
     * return ResponseEntity with no content status
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
}

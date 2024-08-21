package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Admin;
import za.ac.cput.service.AdminService;

import java.util.List;

/**
 * AdminLoginController.java
 * This is the controller class for handling admin.
 * Date: 19 July 2024
 * @author Siyanda Mthimkhulu 220142879
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
     */
    @PostMapping("/create")
    public Admin create(@RequestBody Admin admin) {
        return adminService.create(admin);
    }
    /**
     * read admin by email as ID
     */
    @GetMapping("/read/{email}")
    public Admin read(@PathVariable String email) {
        return adminService.read(email);
    }
    /**
     * update admin
     */
    @PutMapping("/update/{email}")
    public Admin update(@PathVariable String email, @RequestBody Admin admin) {
        return adminService.update(email, admin);

    }

    /**
     * Delete an Admin by email
     */
    @DeleteMapping("/delete/{email}")
    public void delete(@PathVariable String email) {
        adminService.delete(email);
    }

    /**
     * get all admins
     */
    @GetMapping("/getAll")
    public List<Admin> getAll() {
        return adminService.getAll();
    }
    /**
     * authenticate admin
     */
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody Admin admin) {
        Admin authAdmin = adminService.authenticate(admin.getEmail(), admin.getPassword());
        if (authAdmin != null) {
            return ResponseEntity.ok(authAdmin);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}

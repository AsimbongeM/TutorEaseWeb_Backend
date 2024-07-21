package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Admin;
import za.ac.cput.service.AdminLoginService;

/**
 * AdminLoginController.java
 * This is the controller class for handling login requests.
 * Date: 21 July 2024
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin")
public class AdminLoginController {

    private final AdminLoginService adminLoginService;

    @Autowired
    public AdminLoginController(AdminLoginService adminLoginService) {
        this.adminLoginService = adminLoginService;
    }

    /**
     * Handles login requests.
     * the username of the admin
     * the password of the admin
     * @return the Admin if credentials are valid, otherwise null
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        // Extract username and password from the Admin object
        String username = admin.getUsername();
        String password = admin.getPassword();

        // Call the login method with username and password
        Admin loggedInAdmin = adminLoginService.login(username, password);

        if (loggedInAdmin != null) {
            return ResponseEntity.ok().body("{\"message\": \"Login successful\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Invalid credentials\"}");
        }
    }


}

package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Admin;
import za.ac.cput.repository.AdminRepository;

import static org.junit.jupiter.api.Assertions.*;
/**
 * AdminLoginServiceTest.java
 * This is the admin login service test class
 * @author Siyanda Mthimkhulu
 * Date: 16 July 2024
 */
@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class AdminLoginServiceTest {

    @Autowired
    private AdminLoginService adminLoginService;

    @Autowired
    private AdminRepository adminRepository;

    private Admin admin;

    @BeforeEach
    void setUp() {
        adminRepository.deleteAll(); // Clean up the database
        admin = new Admin.Builder()
                .setUsername("admin1")
                .setPassword("password1")
                .setFirstName("John")
                .setLastName("Doe")
                .setEmail("john.doe@example.com")
                .setCellphoneNumber("1234567890")
                .build();
        adminRepository.save(admin); // Save the admin to the database
    }

    @Test
    @Order(1)
    void testLogin_ValidCredentials() {
        Admin foundAdmin = adminLoginService.login("admin1", "password1");
        assertNotNull(foundAdmin, "Admin should be found with valid credentials");
        assertEquals(admin.getUsername(), foundAdmin.getUsername(), "Usernames should match");
        assertEquals(admin.getPassword(), foundAdmin.getPassword(), "Passwords should match");
    }

    @Test
    @Order(2)
    void testLogin_InvalidCredentials() {
        Admin foundAdmin = adminLoginService.login("admin1", "wrongPassword");
        assertNull(foundAdmin, "Admin should not be found with invalid credentials");
    }

    @Test
    @Order(3)
    void testLogin_NonExistentUsername() {
        Admin foundAdmin = adminLoginService.login("nonExistentUser", "password1");
        assertNull(foundAdmin, "Admin should not be found with a non-existent username");
    }
}

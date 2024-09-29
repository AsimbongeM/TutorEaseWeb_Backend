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
                .setPassword("Password@123")
                .setFirstName("Asimbonge")
                .setLastName("Mbende")
                .setEmail("asim@gmail.com")
                .setCellphoneNumber("0633065703")
                .build();
        adminRepository.save(admin); // Save the admin to the database
    }

    @Test
    @Order(1)
    void testLogin_ValidCredentials() {
        Admin foundAdmin = adminLoginService.login("asim@gmail.com", "Password@123");
        assertNotNull(foundAdmin, "Admin should be found with valid credentials");
        assertEquals(admin.getEmail(), foundAdmin.getEmail(), "Emails should match");
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
    void testLogin_NonExistentEmail() {
        Admin foundAdmin = adminLoginService.login("x@x.com", "password1");
        assertNull(foundAdmin, "Admin should not be found with a non-existent email");
    }
}

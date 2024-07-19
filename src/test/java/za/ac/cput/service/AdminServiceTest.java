package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import za.ac.cput.domain.Admin;
import za.ac.cput.repository.AdminRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)

class AdminServiceTest {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AdminRepository adminRepository;

    private Admin admin;

    @BeforeEach
    void setUp() {
        adminRepository.deleteAll(); // Clean up the database
        admin = new Admin.Builder()
                .setUsername("admin1")
                .setPassword("password1")
                .build();
        adminRepository.save(admin); // Save the admin to the database
    }

    @Test
    @Order(1)
    void testCreate() {
        Admin newAdmin = new Admin.Builder()
                .setUsername("admin2")
                .setPassword("password2")
                .build();
        Admin createdAdmin = adminService.create(newAdmin);

        assertNotNull(createdAdmin);
        assertEquals(newAdmin.getUsername(), createdAdmin.getUsername());
        assertNotEquals(admin.getId(), createdAdmin.getId()); // Ensure that it's a new admin
    }

    @Test
    @Order(2)
    void testRead() {
        Optional<Admin> foundAdminOptional = adminRepository.findById(admin.getId());

        assertTrue(foundAdminOptional.isPresent(), "Admin should be present in the database");

        Admin foundAdmin = foundAdminOptional.get();
        assertEquals(admin.getId(), foundAdmin.getId(), "Admin IDs should match");
        assertEquals(admin.getUsername(), foundAdmin.getUsername(), "Admin usernames should match");
        assertEquals(admin.getPassword(), foundAdmin.getPassword(), "Admin passwords should match");
    }

    @Test
    @Order(3)
    void testUpdate() {
        Admin updatedAdmin = new Admin.Builder()
                .setId(admin.getId())
                .setUsername("updatedUsername")
                .setPassword(admin.getPassword()) // Preserve the password for simplicity
                .build();

        Admin result = adminService.update(updatedAdmin);

        assertNotNull(result);
        assertEquals(admin.getId(), result.getId());
        assertEquals("updatedUsername", result.getUsername());
    }

    @Test
    @Order(4)
    void testUpdate_NotFound() {
        Admin nonExistingAdmin = new Admin.Builder()
                .setId(100L) // Assuming ID 100 does not exist in the database
                .setUsername("nonExistingAdmin")
                .setPassword("password")
                .build();

        Admin updatedAdmin = adminService.update(nonExistingAdmin);

        assertNull(updatedAdmin);
    }

    @Test
    @Order(5)
    @Disabled
    void testDelete() {
        adminService.delete(admin.getId());

        Optional<Admin> deletedAdminOptional = adminRepository.findById(admin.getId());
        assertFalse(deletedAdminOptional.isPresent());
    }
}

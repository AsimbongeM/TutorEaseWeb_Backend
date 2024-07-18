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
@Transactional
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
                .setId(1L)
                .setUsername("admin1")
                .setPassword("password1")
                .build();
    }

    @Test
    @Order(1)
    void testCreate() {
        Admin createdAdmin = adminService.create(admin);

        assertNotNull(createdAdmin);
        assertEquals(admin.getId(), createdAdmin.getId());
    }

    @Test
    @Order(2)
void testRead() {
    // Save the admin entity to the database
    Admin savedAdmin = adminRepository.save(admin);

    // Attempt to retrieve the admin by its ID
    Optional<Admin> foundAdminOptional = adminRepository.findById(savedAdmin.getId());

    // Assert that the admin is present in the database
    assertTrue(foundAdminOptional.isPresent(), "Admin should be present in the database");

    // Get the admin object from Optional
    Admin foundAdmin = foundAdminOptional.get();

    // Assert that the retrieved admin matches the saved admin
    assertEquals(savedAdmin.getId(), foundAdmin.getId(), "Admin IDs should match");
    assertEquals(savedAdmin.getUsername(), foundAdmin.getUsername(), "Admin usernames should match");
    assertEquals(savedAdmin.getPassword(), foundAdmin.getPassword(), "Admin passwords should match");
}

    @Test
    @Order(3)
    void testUpdate() {
        Admin savedAdmin = adminRepository.save(admin);

        Admin updatedAdmin = new Admin.Builder()
                .setId(savedAdmin.getId())
                .setUsername("updatedUsername")
                .build();

        Admin result = adminService.update(updatedAdmin);

        assertNotNull(result);
        assertEquals(savedAdmin.getId(), result.getId());
        assertEquals("updatedUsername", result.getUsername());
    }

    @Test
    @Order(4)
    void testUpdate_NotFound() {
        // Create a new Admin object with a non-existing ID
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
        Admin savedAdmin = adminRepository.save(admin);

        adminService.delete(savedAdmin.getId());

        Optional<Admin> deletedAdminOptional = adminRepository.findById(savedAdmin.getId());
        assertFalse(deletedAdminOptional.isPresent());
    }
}

package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Admin;
import za.ac.cput.repository.AdminRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
/**
 * AdminServiceTest.java
 * This is the admin service test class
 * @author Siyanda Mthimkhulu
 * Date: 16 July 2024
 */
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
        // adminRepository.deleteAll(); // Clean up the database

        admin = new Admin.Builder()
                .setPassword("password1")
                .setFirstName("Siyanda")
                .setLastName("Doe")
                .setEmail("fury@x.com")
                .setCellphoneNumber("0780969828")
                .build();

        adminRepository.save(admin); // Save the admin to the database
    }


    @Test
    @Order(1)
    void testCreate() {
        Admin newAdmin = new Admin.Builder()
                .setPassword("password2")
                .setFirstName("Thandolwethu")
                .setLastName("Khoza")
                .setEmail("T.Khoza@hotmail.com")
                .setCellphoneNumber("0731010101")
                .build();
        Admin createdAdmin = adminService.create(newAdmin);
        adminRepository.save(admin);

        assertNotNull(createdAdmin);
        assertEquals(newAdmin.getFirstName(), createdAdmin.getFirstName());
        assertNotEquals(admin.getEmail(), createdAdmin.getEmail()); // Ensure that it's a new admin
    }

    @Test
    @Order(2)
    void testRead() {
        Optional<Admin> foundAdminOptional = adminRepository.findById(admin.getEmail());

        assertTrue(foundAdminOptional.isPresent(), "Admin should be present in the database");

        Admin foundAdmin = foundAdminOptional.get();
        System.out.println(foundAdmin);
        assertEquals(admin.getEmail(), foundAdmin.getEmail(), "Admin IDs should match");
        assertEquals(admin.getFirstName(), foundAdmin.getFirstName(), "Admin usernames should match");
        assertEquals(admin.getPassword(), foundAdmin.getPassword(), "Admin passwords should match");
    }

    @Test
    @Order(3)
    void testUpdate() {
        Admin updatedAdmin = new Admin.Builder()
                .setEmail(admin.getEmail())
                .setFirstName("updatedFirstName")
                .setPassword(admin.getPassword()) // Preserve the password for simplicity
                .build();

        Admin result = adminService.update(admin.getEmail(), updatedAdmin); // Expecting a Student return type
        assertNotNull(result);
        System.out.println("Updated Admin: " + result);

        /*verify the update by reading the again*/
        assertEquals(admin.getEmail(), result.getEmail(), "Admin emails should match");
        assertEquals("updatedFirstName", result.getFirstName(), "Admin usernames should match");
        assertEquals(admin.getPassword(), result.getPassword(), "Admin passwords should match");

    }

    @Test
    @Order(4)
    void testUpdate_NotFound() {
        Admin nonExistingAdmin = new Admin.Builder()
                .setEmail("a@v.com") // Assuming ID 100 does not exist in the database
                .setFirstName("nonExistingAdmin")
                .setPassword("password")
                .build();

        Admin updatedAdmin = adminService.update(nonExistingAdmin.getEmail(), nonExistingAdmin);

        assertNull(updatedAdmin);
    }

    @Test
    @Order(5)
    @Disabled
    void testDelete() {
        adminService.delete(admin.getEmail());

        Optional<Admin> deletedAdminOptional = adminRepository.findById(admin.getEmail());
        assertFalse(deletedAdminOptional.isPresent());
    }
}

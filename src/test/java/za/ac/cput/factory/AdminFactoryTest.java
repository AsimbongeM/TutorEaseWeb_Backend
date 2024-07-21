package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Admin;
import static org.junit.jupiter.api.Assertions.*;

/**
 * AdminFactoryTest.java
 * This is the admin object creation test class with additional fields
 * @author Siyanda Mthimkhulu
 * Date: 16 July 2024
 */
public class AdminFactoryTest {
    @Test
    public void buildAdmin_Success() {
        Admin admin = AdminFactory.buildAdmin("kaoz", "password", "John", "Doe", "john.doe@example.com", "1234567890");

        assertNotNull(admin);
        assertEquals("kaoz", admin.getUsername());
        assertEquals("password", admin.getPassword());
        assertEquals("John", admin.getFirstName());
        assertEquals("Doe", admin.getLastName());
        assertEquals("john.doe@example.com", admin.getEmail());
        assertEquals("1234567890", admin.getCellphoneNumber());
    }

    @Test
    public void buildAdmin_NullUsername() {
        Admin admin = AdminFactory.buildAdmin(null, "password", "John", "Doe", "john.doe@example.com", "1234567890");

        assertNull(admin);
    }

    @Test
    public void buildAdmin_EmptyUsername() {
        Admin admin = AdminFactory.buildAdmin("", "password", "John", "Doe", "john.doe@example.com", "1234567890");

        assertNull(admin);
    }

    @Test
    public void buildAdmin_NullPassword() {
        Admin admin = AdminFactory.buildAdmin("kaoz", null, "John", "Doe", "john.doe@example.com", "1234567890");

        assertNull(admin);
    }

    @Test
    public void buildAdmin_EmptyPassword() {
        Admin admin = AdminFactory.buildAdmin("kaoz", "", "John", "Doe", "john.doe@example.com", "1234567890");

        assertNull(admin);
    }

    @Test
    public void buildAdmin_InvalidEmail() {
        Admin admin = AdminFactory.buildAdmin("kaoz", "password", "John", "Doe", "invalid-email", "1234567890");

        assertNull(admin);
    }

    @Test
    public void buildAdmin_NullFirstName() {
        Admin admin = AdminFactory.buildAdmin("kaoz", "password", null, "Doe", "john.doe@example.com", "1234567890");

        assertNull(admin);
    }

    @Test
    public void buildAdmin_EmptyFirstName() {
        Admin admin = AdminFactory.buildAdmin("kaoz", "password", "", "Doe", "john.doe@example.com", "1234567890");

        assertNull(admin);
    }

    @Test
    public void buildAdmin_NullLastName() {
        Admin admin = AdminFactory.buildAdmin("kaoz", "password", "John", null, "john.doe@example.com", "1234567890");

        assertNull(admin);
    }

    @Test
    public void buildAdmin_EmptyLastName() {
        Admin admin = AdminFactory.buildAdmin("kaoz", "password", "John", "", "john.doe@example.com", "1234567890");

        assertNull(admin);
    }

    @Test
    public void buildAdmin_NullCellphoneNumber() {
        Admin admin = AdminFactory.buildAdmin("kaoz", "password", "John", "Doe", "john.doe@example.com", null);

        assertNull(admin);
    }

    @Test
    public void buildAdmin_EmptyCellphoneNumber() {
        Admin admin = AdminFactory.buildAdmin("kaoz", "password", "John", "Doe", "john.doe@example.com", "");

        assertNull(admin);
    }
}

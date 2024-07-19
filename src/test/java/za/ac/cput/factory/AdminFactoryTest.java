package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Admin;
import static org.junit.jupiter.api.Assertions.*;
/**
 * AdminFactoryTest.java
 * This is the admin object creation test class
 * @author Siyanda Mthimkhulu (220148279)
 * Date: 16 July 2024
 */
public class AdminFactoryTest {

    @Test
    public void buildAdmin_Success() {
        Admin admin = AdminFactory.buildAdmin("kaoz@tutamail.com", "password");

        assertNotNull(admin);
        assertEquals("kaoz@tutamail.com", admin.getUsername());
        assertEquals("password", admin.getPassword());
    }

    @Test
    public void buildAdmin_NullUsername() {
        Admin admin = AdminFactory.buildAdmin(null, "password");

        assertNull(admin);
    }

    @Test
    public void buildAdmin_EmptyUsername() {
        Admin admin = AdminFactory.buildAdmin("", "password");

        assertNull(admin);
    }

    @Test
    public void buildAdmin_NullPassword() {
        Admin admin = AdminFactory.buildAdmin("kaoz@tutamail.com", null);

        assertNull(admin);
    }

    @Test
    public void buildAdmin_EmptyPassword() {
        Admin admin = AdminFactory.buildAdmin("kaoz@tutamail.com", "");

        assertNull(admin);
    }


}

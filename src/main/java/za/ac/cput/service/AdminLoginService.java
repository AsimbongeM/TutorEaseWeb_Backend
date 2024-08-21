package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Admin;
import za.ac.cput.repository.AdminRepository;

/**
 * AdminLoginService.java
 * This is the service class for handling admin login.
 * @author Siyanda Mthimkhulu (220148279)
 * Date: 21 July 2024
 */
@Service
public class AdminLoginService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminLoginService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    /**
     * Verifies admin login credentials.
     * @param email the email of the admin
     * @param password the password of the admin
     * @return the Admin if credentials are valid, otherwise null
     */
    public Admin login(String email, String password) {
        return adminRepository.findByEmailAndPassword(email, password);
    }
}

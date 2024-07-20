package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Admin;
import za.ac.cput.repository.AdminRepository;

import java.util.Optional;
/**
 * AdminService.java
 * This is the admin services class
 * @author Siyanda Mthimkhulu (220148279)
 * Date: 16 July 2024
 */
@Service
public class AdminService implements IAdminService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public Admin create(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Admin read(Long adminId) {
        Optional<Admin> adminOptional = adminRepository.findById(adminId);
        return adminOptional.orElse(null);
    }

    @Override
    public Admin update(Admin admin) {
        if (adminRepository.existsById(admin.getId())) {
            return adminRepository.save(admin);
        }
        return null;
    }

    @Override
    public void delete(Long adminId) {
        adminRepository.deleteById(adminId);
    }

    public Admin readByUsername(String username) {
        return adminRepository.findByUsername(username);
    }
}

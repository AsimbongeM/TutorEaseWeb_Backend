package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Admin;
import za.ac.cput.repository.AdminRepository;

import java.util.List;
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
    public Admin read(String adminEmail) {
        Optional<Admin> adminOptional = adminRepository.findById(adminEmail);
        return adminOptional.orElse(null);
    }

    @Override
    public Admin update(String email, Admin admin) {
        Admin existingAdmin= read(email);

        if (existingAdmin!=null) {
            Admin updatedAdmin=new Admin.Builder()
                    .copy(existingAdmin)
                    .setFirstName(admin.getFirstName())
                    .setLastName(admin.getLastName())
                    .setPassword(admin.getPassword())
                    .setCellphoneNumber(admin.getCellphoneNumber())
                    .build();
            return adminRepository.save(updatedAdmin);
        }
        return null;
    }

    @Override
    public void delete(String adminEmail) {
        adminRepository.deleteById(adminEmail);
    }
    @Override
    public List<Admin> getAll() {
        return adminRepository.findAll();
    }
    public Admin authenticate(String email, String password) {
        return adminRepository.findByEmailAndPassword(email, password);
    }

}

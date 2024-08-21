package za.ac.cput.service;

import za.ac.cput.domain.Admin;
import java.util.List;

/**
 * IAdminService.java
 * This is the admin services interface
 * @author Siyanda Mthimkhulu (220148279)
 * Date: 16 July 2024
 */
public interface IAdminService extends IService<Admin, String> {
    Admin update(String email, Admin admin);
    List<Admin> getAll();
}

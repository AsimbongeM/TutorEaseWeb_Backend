package za.ac.cput.service;

import za.ac.cput.domain.Admin;
/**
 * IAdminService.java
 * This is the admin services interface
 * @author Siyanda Mthimkhulu (220148279)
 * Date: 16 July 2024
 */
public interface IAdminService extends IService<Admin, Long> {
    Admin update(Admin admin);
}

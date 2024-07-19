package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Admin;
/**
 * AdminRepository.java
 * This is the admin repository interface
 * @author Siyanda Mthimkhulu (220148279)
 * Date: 16 July 2024
 */
@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username);
}

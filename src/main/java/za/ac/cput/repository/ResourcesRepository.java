package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Resources;

import java.util.List;

@Repository
public interface ResourcesRepository extends JpaRepository<Resources,Long> {
    List<Resources> findByTutorEmail(String tutorEmail);
}

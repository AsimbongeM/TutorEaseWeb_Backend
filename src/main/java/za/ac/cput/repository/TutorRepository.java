package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Tutor;

@Repository
public interface TutorRepository extends JpaRepository<Tutor,String> {
}

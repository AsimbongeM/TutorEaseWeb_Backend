package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Tutor;
import za.ac.cput.domain.TutorApprovalStatus;

import java.util.List;

@Repository
public interface TutorRepository extends JpaRepository<Tutor,String> {
    Tutor findByEmailAndPassword(String email, String password);
    List<Tutor> findByApprovalStatus(TutorApprovalStatus approvalStatus);
}

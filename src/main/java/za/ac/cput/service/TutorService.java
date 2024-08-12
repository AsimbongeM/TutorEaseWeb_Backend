package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Tutor;
import za.ac.cput.repository.TutorRepository;

import java.util.List;

@Service
public class TutorService implements ITutorService {
    private TutorRepository tutorRepository;

    @Autowired
    TutorService(TutorRepository tutorRepository) {
        this.tutorRepository = tutorRepository;
    }

    @Override
    public Tutor create(Tutor tutor) {
        return tutorRepository.save(tutor);
    }

    @Override
    public Tutor read(String email) {
        return this.tutorRepository.findById(email).orElse(null);
    }

    @Override
    public Tutor update(String email,Tutor tutor) {
        Tutor existingTutor= read(email);

        if (existingTutor!=null) {
            Tutor updatedTutor=new Tutor.Builder()
                    .copy(existingTutor)
                    .setFirstName(tutor.getFirstName())
                    .setLastName(tutor.getLastName())
                    .setPassword(tutor.getPassword())
                    .setAge(tutor.getAge())
                    .setCellNumber(tutor.getCellNumber())
                    .setSkills(tutor.getSkills())
                    .setExperience(tutor.getExperience())
                    .build();
            return tutorRepository.save(updatedTutor);
        }
        return null;
    }

    @Override
    public void delete(String tutorEmail) {
        tutorRepository.deleteById(tutorEmail);
    }

    @Override
    public List<Tutor> getAll() {
        return tutorRepository.findAll();
    }
    public Tutor authenticate(String email, String password) {
        return tutorRepository.findByEmailAndPassword(email, password);
    }
}

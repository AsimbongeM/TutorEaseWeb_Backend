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
    public Tutor read(String tutorEmail) {
        return this.tutorRepository.findById(tutorEmail).orElse(null);
    }

    @Override
    public Tutor update(Tutor tutor) {
        if (tutorRepository.existsById(tutor.getEmail())) {
            return tutorRepository.save(tutor);
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
}

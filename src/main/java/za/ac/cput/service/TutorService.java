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
    public Tutor read(Long tutorId) {
        return this.tutorRepository.findById(tutorId).orElse(null);
    }

    @Override
    public Tutor update(Tutor tutor) {
        if (tutorRepository.existsById(tutor.getId())) {
            return tutorRepository.save(tutor);
        }
        return null;
    }

    @Override
    public void delete(Long tutorId) {
        tutorRepository.deleteById(tutorId);
    }

    @Override
    public List<Tutor> getAll() {
        return tutorRepository.findAll();
    }
}

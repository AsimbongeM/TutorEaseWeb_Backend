package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Topics;
import za.ac.cput.repository.TopicsRepository;

import java.util.List;
@Service
public class TopicsService implements ITopicsService{
    private TopicsRepository TopicsRepository;

    @Autowired
    TopicsService(TopicsRepository TopicsRepository) {
        this.TopicsRepository = TopicsRepository;
    }

    @Override
    public Topics create(Topics Topics) {
        return TopicsRepository.save(Topics);
    }

    @Override
    public Topics read(Long TopicsId) {
        return this.TopicsRepository.findById(TopicsId).orElse(null);
    }

    @Override
    public Topics update(Topics Topics) {
        if (TopicsRepository.existsById(Topics.getId())) {
            return TopicsRepository.save(Topics);
        }
        return null;
    }

    @Override
    public void delete(Long TopicsId) {
        TopicsRepository.deleteById(TopicsId);
    }

    @Override
    public List<Topics> getAll() {
        return TopicsRepository.findAll();
    }
}


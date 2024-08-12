package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Topics;
import za.ac.cput.repository.TopicsRepository;

import java.util.List;
@Service
public class TopicsService implements ITopicsService{
    private TopicsRepository topicsRepository;

    @Autowired
    TopicsService(TopicsRepository topicsRepository) {
        this.topicsRepository = topicsRepository;
    }

    @Override
    public Topics create(Topics topics) {
        return topicsRepository.save(topics);
    }

    @Override
    public Topics read(Long topicsId) {
        return this.topicsRepository.findById(topicsId).orElse(null);
    }

    @Override
    public Topics update(Topics topics) {
        if (topicsRepository.existsById(topics.getId())) {
            return topicsRepository.save(topics);
        }
        return null;
    }

    @Override
    public void delete(Long topicsId) {
        topicsRepository.deleteById(topicsId);
    }

    @Override
    public List<Topics> getAll() {
        return topicsRepository.findAll();
    }
}


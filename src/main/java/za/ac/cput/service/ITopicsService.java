package za.ac.cput.service;

import za.ac.cput.domain.Notification;
import za.ac.cput.domain.Topics;

import java.util.List;

public interface ITopicsService {
     Topics create(Topics topics);

    Topics read(Long topicsId);

    Topics update(Topics topics);

    List<Topics> getAll();
}

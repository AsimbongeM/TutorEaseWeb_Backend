package za.ac.cput.service;

import za.ac.cput.domain.Topics;

import java.util.List;

public interface ITopicsService extends IService <Topics, Long>{
    List<Topics> getAll();
}

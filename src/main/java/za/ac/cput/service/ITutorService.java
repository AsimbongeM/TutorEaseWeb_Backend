package za.ac.cput.service;

import za.ac.cput.domain.Tutor;

import java.util.List;

public interface ITutorService extends IService<Tutor,String> {
    List<Tutor> getAll();
}

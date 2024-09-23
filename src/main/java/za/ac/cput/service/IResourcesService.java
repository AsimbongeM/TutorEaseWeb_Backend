package za.ac.cput.service;

import za.ac.cput.domain.Resources;

import java.util.List;

public interface IResourcesService extends IService<Resources,Long> {

    List<Resources> getAllResources();
}

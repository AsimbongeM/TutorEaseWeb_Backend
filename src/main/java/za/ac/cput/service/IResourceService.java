package za.ac.cput.service;

import za.ac.cput.domain.Resource;

import java.util.List;

public interface IResourceService extends IService<Resource,Long> {

    List<Resource> getAllResources();
}

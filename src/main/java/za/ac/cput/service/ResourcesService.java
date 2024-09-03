package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import za.ac.cput.domain.Resources;
import za.ac.cput.domain.Tutor;
import za.ac.cput.repository.ResourcesRepository;
import za.ac.cput.repository.TutorRepository;

import java.util.List;

@Service
public class ResourcesService {

    @Autowired
    private ResourcesRepository resourceRepository;

    @Autowired
    private TutorRepository tutorRepository;

    public void saveFile(MultipartFile file, String type, String tutorEmail) throws Exception {
        Tutor tutor = tutorRepository.findById(tutorEmail)
                .orElseThrow(() -> new Exception("Tutor not found"));

        Resources resource = new Resources.Builder()
                .setFileName(file.getOriginalFilename()) // Set file name
                .setFileType(file.getContentType()) // Set file type
                .setDocument(type.equals("document") ? file.getBytes() : null)
                .setRecordings(type.equals("recording") ? file.getBytes() : null)
                .setTutor(tutor)
                .build();

        resourceRepository.save(resource);
    }

    public List<Resources> findByTutorEmail(String tutorEmail) {
        return resourceRepository.findByTutorEmail(tutorEmail);
    }

    public void deleteFile(Long id) {
        resourceRepository.deleteById(id);
    }

    public void updateFile(Long id, MultipartFile file) throws Exception {
        Resources existingResource = resourceRepository.findById(id)
                .orElseThrow(() -> new Exception("File not found"));

        Resources updatedResource = new Resources.Builder()
                .copy(existingResource)
                .setFileName(file.getOriginalFilename()) // Update file name
                .setFileType(file.getContentType()) // Update file type
                .setDocument(existingResource.getDocument() != null ? file.getBytes() : null)
                .setRecordings(existingResource.getRecordings() != null ? file.getBytes() : null)
                .build();

        resourceRepository.save(updatedResource);
    }
}

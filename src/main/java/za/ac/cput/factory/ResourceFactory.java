package za.ac.cput.factory;
import za.ac.cput.domain.Resource;
import za.ac.cput.domain.Tutor;

public class ResourceFactory {

    public static Resource createResources(Long id, byte[] document, byte[] recordings, Tutor tutor) {
        return new Resource.Builder()
                .setId(id)
                .setDocument(document)
                .setRecordings(recordings)
                .setTutor(tutor)
                .build();
    }
}

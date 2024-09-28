package za.ac.cput.factory;

import za.ac.cput.domain.Resources;
import za.ac.cput.domain.Tutor;

public class ResourcesFactory {

    public static Resources createResources(Long id, byte[] document, byte[] recordings, Tutor tutor) {
        return new Resources.Builder()
                .setId(id)
                .setDocument(document)
                .setRecordings(recordings)
                .setTutor(tutor)
                .build();
    }
}

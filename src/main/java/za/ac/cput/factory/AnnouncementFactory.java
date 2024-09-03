package za.ac.cput.factory;

import za.ac.cput.domain.Announcement;
import za.ac.cput.domain.Tutor;

public class AnnouncementFactory {

    public static Announcement createAnnouncement(Long id, String text, Tutor tutor) {
        return new Announcement.Builder()
                .setId(id)
                .setText(text)
                .setTutor(tutor)
                .build();
    }
}

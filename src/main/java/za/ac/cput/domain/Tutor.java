package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.Objects;
import java.util.Set;

@Entity
public class Tutor {
    //Asimbonge
    @Id
    private String email;
    private String firstName;
    private String lastName;
    private int age;
    @Column(unique = true)
    private String cellNumber;
    private String password;
    private String skills;
    private int experience;
    //    @Lob
//    @Column(length = 10000000)
//    private byte[] profilePicture;
//    @Lob
//    @Column(length = 10000000)
//    private byte[] idDocument;
//    @Lob
//    @Column(length = 10000000)
//    private byte[] sarsDocument;
    @Enumerated(EnumType.STRING)
    private TutorApprovalStatus approvalStatus;
    @OneToMany(mappedBy = "tutor")
    private Set<ScheduleSession> scheduleSessions;
    @OneToMany(mappedBy = "tutor")
    private Set<Resources> resources;
    @OneToMany(mappedBy = "tutor")
    private Set<BookSession> bookSessions;
    @OneToMany(mappedBy = "tutor")

    private Set<Announcement> announcements;
    protected Tutor() {
    }

    private Tutor(Builder builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.age = builder.age;
        this.cellNumber = builder.cellNumber;
        this.password = builder.password;
        this.skills = builder.skills;
        this.experience = builder.experience;
//        this.profilePicture = builder.profilePicture;
//        this.idDocument = builder.idDocument;
//        this.sarsDocument = builder.sarsDocument;
        this.approvalStatus = builder.approvalStatus != null ? builder.approvalStatus : TutorApprovalStatus.PENDING;
        this.scheduleSessions = builder.scheduleSessions;
        this.resources = builder.resources;
        this.announcements = builder.announcements;
        this.bookSessions = builder.bookSessions;

    }


    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public int getAge() {
        return age;
    }

    public String getEmail() {
        return email;
    }

    public String getCellNumber() {
        return cellNumber;
    }

    public String getPassword() {
        return password;
    }

    public String getSkills() {
        return skills;
    }

    public int getExperience() {
        return experience;
    }

//    public byte[] getProfilePicture() {
//        return profilePicture;
//    }
//
//    public byte[] getIdDocument() {
//        return idDocument;
//    }
//
//    public byte[] getSarsDocument() {
//        return sarsDocument;
//    }

    public TutorApprovalStatus getApprovalStatus() {
        return approvalStatus;
    }

    public Set<ScheduleSession> getScheduleSessions() {
        return scheduleSessions;
    }

    public Set<Resources> getResources() {
        return resources;
    }

    public Set<Announcement> getAnnouncements() {
        return announcements;
    }

    public Set<BookSession> getBookSessions() {
        return bookSessions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tutor tutor = (Tutor) o;

        return age == tutor.age && experience == tutor.experience && Objects.equals(email, tutor.email) && Objects.equals(firstName, tutor.firstName) && Objects.equals(lastName, tutor.lastName) && Objects.equals(cellNumber, tutor.cellNumber) && Objects.equals(password, tutor.password) && Objects.equals(skills, tutor.skills) && approvalStatus == tutor.approvalStatus && Objects.equals(scheduleSessions, tutor.scheduleSessions) && Objects.equals(resources, tutor.resources) && Objects.equals(bookSessions, tutor.bookSessions) && Objects.equals(announcements, tutor.announcements);

    }

    @Override
    public int hashCode() {

        return Objects.hash(email, firstName, lastName, age, cellNumber, password, skills, experience, approvalStatus, scheduleSessions, resources, bookSessions, announcements);

    }

    @Override
    public String toString() {
        return "Tutor{" +
                "email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                ", cellNumber='" + cellNumber + '\'' +
                ", password='" + password + '\'' +
                ", skills='" + skills + '\'' +
                ", experience=" + experience +
                ", approvalStatus=" + approvalStatus +
                ", scheduleSessions=" + scheduleSessions +
                ", resources=" + resources +
                ", bookSessions=" + bookSessions +

                ", announcements=" + announcements +
                '}';
    }

    public static class Builder {
        private String firstName;
        private String lastName;
        private String email;
        private int age;
        private String cellNumber;
        private String password;
        private String skills;
        private int experience;
        //        private byte[] profilePicture;
//        private byte[] idDocument;
//        private byte[] sarsDocument;
        private TutorApprovalStatus approvalStatus;
        private Set<ScheduleSession> scheduleSessions;
        private Set<Resources> resources;
        private Set<Announcement> announcements;
        private Set<BookSession> bookSessions;

        public Builder setFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public Builder setLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public Builder setAge(int age) {
            this.age = age;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setCellNumber(String cellNumber) {
            this.cellNumber = cellNumber;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder setSkills(String skills) {
            this.skills = skills;
            return this;
        }

        public Builder setExperience(int experience) {
            this.experience = experience;
            return this;
        }


//        public Builder setProfilePicture(byte[] profilePicture) {
//            this.profilePicture = profilePicture;
//            return this;
//        }
//        public Builder setIdDocument(byte[] idDocument) {
//            this.idDocument = idDocument;
//            return this;
//        }
//
//        public Builder setSarsDocument(byte[] sarsDocument) {
//            this.sarsDocument = sarsDocument;
//            return this;
//        }

        public Builder setApprovalStatus(TutorApprovalStatus approvalStatus) {
            this.approvalStatus = approvalStatus;
            return this;
        }

        public Builder setScheduleSessions(Set<ScheduleSession> scheduleSessions) {
            this.scheduleSessions = scheduleSessions;
            return this;
        }

        public Builder setResources(Set<Resources> resources) {
            this.resources = resources;
            return this;
        }

        public Builder setBookSessions(Set<BookSession> bookSessions) {
            this.bookSessions = bookSessions;
            return this;
        }

        public Builder setAnnouncements(Set<Announcement> announcements) { // Builder method for announcements
            this.announcements = announcements;
            return this;
        }
        public Builder copy(Tutor tutor) {
            this.firstName = tutor.firstName;
            this.lastName = tutor.lastName;
            this.email = tutor.email;
            this.age = tutor.age;
            this.cellNumber = tutor.cellNumber;
            this.password = tutor.password;
            this.skills = tutor.skills;
            this.experience = tutor.experience;
//            this.profilePicture = tutor.profilePicture;
//            this.idDocument = tutor.idDocument;
//            this.sarsDocument = tutor.sarsDocument;
            this.approvalStatus = tutor.approvalStatus;
            this.scheduleSessions = tutor.scheduleSessions;
            this.resources = tutor.resources;
            this.announcements = tutor.announcements;
            this.bookSessions = tutor.bookSessions;
            return this;

        }

        public Tutor build() {
            return new Tutor(this);
        }
    }
}

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
    private Set<Resource> resource;

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
        this.resource = builder.resource;
        this.announcements = builder.announcements;
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

    public Set<Resource> getResource() {
        return resource;
    }

    public Set<Announcement> getAnnouncements() {
        return announcements;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tutor tutor = (Tutor) o;
        return age == tutor.age && experience == tutor.experience && Objects.equals(email, tutor.email) && Objects.equals(firstName, tutor.firstName) && Objects.equals(lastName, tutor.lastName) && Objects.equals(cellNumber, tutor.cellNumber) && Objects.equals(password, tutor.password) && Objects.equals(skills, tutor.skills) && approvalStatus == tutor.approvalStatus && Objects.equals(scheduleSessions, tutor.scheduleSessions) && Objects.equals(resource, tutor.resource) && Objects.equals(announcements, tutor.announcements);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, firstName, lastName, age, cellNumber, password, skills, experience, approvalStatus, scheduleSessions, resource, announcements);
    }

    @Override
    public String toString() {
        return "Tutor{" +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                ", cellNumber='" + cellNumber + '\'' +
                ", password='" + password + '\'' +
                ", skills='" + skills + '\'' +
                ", experience=" + experience +
//                ", profilePicture=" + Arrays.toString(profilePicture) +
//                ", idDocument=" + Arrays.toString(idDocument) +
//                ", sarsDocument=" + Arrays.toString(sarsDocument) +
                ", approvalStatus=" + approvalStatus +
                ", scheduleSessions=" + scheduleSessions +
                ", resource=" + resource +
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
        private Set<Resource> resource;
        private Set<Announcement> announcements;

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

        public Builder setResource(Set<Resource> resource) {
            this.resource = resource;
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
            this.resource = tutor.resource;
            this.announcements = tutor.announcements;
            return this;

        }

        public Tutor build() {
            return new Tutor(this);
        }
    }
}

package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.Arrays;
import java.util.Objects;

@Entity
public class Tutor {
    //Asimbonge
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private int age;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String cellNumber;
    private String password;
    private String skills;
    private int experience;
    @Lob
    @Column(length = 10000000)
    private byte[] idDocument;
    @Lob
    @Column(length = 10000000)
    private byte[] sarsDocument;
    private boolean isApproved;

    protected Tutor() {
    }

    private Tutor(Builder builder) {
        this.id = builder.id;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.age = builder.age;
        this.email = builder.email;
        this.cellNumber = builder.cellNumber;
        this.password = builder.password;
        this.skills = builder.skills;
        this.experience = builder.experience;
        this.idDocument = builder.idDocument;
        this.sarsDocument = builder.sarsDocument;
        this.isApproved = builder.isApproved;
    }

    public Long getId() {
        return id;
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

    public byte[] getIdDocument() {
        return idDocument;
    }

    public byte[] getSarsDocument() {
        return sarsDocument;
    }

    public boolean isApproved() {
        return isApproved;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tutor tutor = (Tutor) o;
        return age == tutor.age && experience == tutor.experience && isApproved == tutor.isApproved && Objects.equals(id, tutor.id) && Objects.equals(firstName, tutor.firstName) && Objects.equals(lastName, tutor.lastName) && Objects.equals(email, tutor.email) && Objects.equals(cellNumber, tutor.cellNumber) && Objects.equals(password, tutor.password) && Objects.equals(skills, tutor.skills) && Arrays.equals(idDocument, tutor.idDocument) && Arrays.equals(sarsDocument, tutor.sarsDocument);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, firstName, lastName, age, email, cellNumber, password, skills, experience, isApproved);
        result = 31 * result + Arrays.hashCode(idDocument);
        result = 31 * result + Arrays.hashCode(sarsDocument);
        return result;
    }

    @Override
    public String toString() {
        return "Tutor{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                ", email='" + email + '\'' +
                ", cellNumber='" + cellNumber + '\'' +
                ", password='" + password + '\'' +
                ", skills='" + skills + '\'' +
                ", experience=" + experience +
                ", idDocument=" + Arrays.toString(idDocument) +
                ", sarsDocument=" + Arrays.toString(sarsDocument) +
                ", isApproved=" + isApproved +
                '}';
    }

    public static class Builder {
        private Long id;
        private String firstName;
        private String lastName;
        private int age;
        private String email;
        private String cellNumber;
        private String password;
        private String skills;
        private int experience;
        private byte[] idDocument;
        private byte[] sarsDocument;
        private boolean isApproved;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

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

        public Builder setIdDocument(byte[] idDocument) {
            this.idDocument = idDocument;
            return this;
        }

        public Builder setSarsDocument(byte[] sarsDocument) {
            this.sarsDocument = sarsDocument;
            return this;
        }

        public Builder setApproved(boolean approved) {
            isApproved = approved;
            return this;
        }

        public Builder copy(Tutor tutor) {
            this.id = tutor.id;
            this.firstName = tutor.firstName;
            this.lastName = tutor.lastName;
            this.age = tutor.age;
            this.email = tutor.email;
            this.cellNumber = tutor.cellNumber;
            this.password = tutor.password;
            this.skills = tutor.skills;
            this.experience = tutor.experience;
            this.idDocument = tutor.idDocument;
            this.sarsDocument = tutor.sarsDocument;
            this.isApproved = tutor.isApproved;
            return this;

        }

        public Tutor build() {
            return new Tutor(this);
        }
    }
}

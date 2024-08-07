package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.Arrays;
import java.util.Objects;

/**
 * Student.java
 * This is the Domain class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 08 July 2024
 */

@Entity
public class Student {
    //Thandolwethu
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
    @Lob
    @Column(length = 10000000)
    private byte[] profilePicture;
    private String password;
    @Enumerated(EnumType.STRING)
    private SkillLevel skillLevel;


    protected Student() {

    }

    public Student(Builder builder) {
        this.id = builder.id;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.age = builder.age;
        this.email = builder.email;
        this.cellNumber = builder.cellNumber;
        this.profilePicture = builder.profilePicture;
        this.password = builder.password;
        this.skillLevel = builder.skillLevel;
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

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public String getPassword() {
        return password;
    }

    public SkillLevel getSkillLevel() {
        return skillLevel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && Objects.equals(id, student.id) && Objects.equals(firstName, student.firstName) && Objects.equals(lastName, student.lastName) && Objects.equals(email, student.email) && Objects.equals(cellNumber, student.cellNumber) && Arrays.equals(profilePicture, student.profilePicture) && Objects.equals(password, student.password) && skillLevel == student.skillLevel;
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, firstName, lastName, age, email, cellNumber, password, skillLevel);
        result = 31 * result + Arrays.hashCode(profilePicture);
        return result;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                ", email='" + email + '\'' +
                ", cellNumber='" + cellNumber + '\'' +
                ", profilePicture=" + Arrays.toString(profilePicture) +
                ", password='" + password + '\'' +
                ", skillLevel='" + skillLevel + '\'' +
                '}';
    }
    public static class Builder{
        private Long id;
        private String firstName;
        private String lastName;
        private int age;
        private String email;
        private String cellNumber;
        private byte[] profilePicture;
        private String password;
        private SkillLevel skillLevel;

        public Builder() {
        }

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

        public Builder setProfilePicture(byte[] profilePicture) {
            this.profilePicture = profilePicture;
            return this;
        }
        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder setSkillLevel(SkillLevel skillLevel) {
            this.skillLevel = skillLevel;
            return this;
        }

        public Builder copy(Student student) {
            this.id = student.id;
            this.firstName = student.firstName;
            this.lastName = student.lastName;
            this.age = student.age;
            this.email = student.email;
            this.cellNumber = student.cellNumber;
            this.profilePicture = student.profilePicture;
            this.password = student.password;
            this.skillLevel = student.skillLevel;
            return this;
        }


        public Student build() {
            return new Student(this);
        }
    }
}

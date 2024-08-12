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
    private String email;
    private String firstName;
    private String lastName;
    private int age;
    @Column(unique = true)
    private String cellNumber;
//    @Lob
//    @Column(length = 10000000)
//    private byte[] profilePicture;
    private String password;
    private String skillLevel;


    protected Student() {

    }

    public Student(Builder builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.age = builder.age;
        this.email = builder.email;
        this.cellNumber = builder.cellNumber;
//        this.profilePicture = builder.profilePicture;
        this.password = builder.password;
        this.skillLevel = builder.skillLevel;
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

//    public byte[] getProfilePicture() {
//        return profilePicture;
//    }

    public String getPassword() {
        return password;
    }

    public String getSkillLevel() {
        return skillLevel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && Objects.equals(email, student.email) && Objects.equals(firstName, student.firstName) && Objects.equals(lastName, student.lastName) && Objects.equals(cellNumber, student.cellNumber) && Objects.equals(password, student.password) && Objects.equals(skillLevel, student.skillLevel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, firstName, lastName, age, cellNumber, password, skillLevel);
    }

    @Override
    public String toString() {
        return "Student{" +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                ", email='" + email + '\'' +
                ", cellNumber='" + cellNumber + '\'' +
                ", password='" + password + '\'' +
                ", skillLevel='" + skillLevel + '\'' +
                '}';
    }
    public static class Builder{
        private String firstName;
        private String lastName;
        private int age;
        private String email;
        private String cellNumber;
//        private byte[] profilePicture;
        private String password;
        private String skillLevel;

        public Builder() {
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

//        public Builder setProfilePicture(byte[] profilePicture) {
//            this.profilePicture = profilePicture;
//            return this;
//        }
        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder setSkillLevel(String skillLevel) {
            this.skillLevel = skillLevel;
            return this;
        }

        public Builder copy(Student student) {
            this.firstName = student.firstName;
            this.lastName = student.lastName;
            this.age = student.age;
            this.email = student.email;
            this.cellNumber = student.cellNumber;
//            this.profilePicture = student.profilePicture;
            this.password = student.password;
            this.skillLevel = student.skillLevel;
            return this;
        }


        public Student build() {
            return new Student(this);
        }
    }
}

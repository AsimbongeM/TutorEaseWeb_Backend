package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.Objects;

/**
 * Admin.java
 * This is the Domain class
 * @author Siyanda Mthimkhulu
 * Date: 16 July 2024
 */
@Entity
public class Admin {
    @Id
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    @Column(unique = true)

    private String cellphoneNumber;

    public Admin() {
    }

    private Admin(Builder builder) {
        this.password = builder.password;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.cellphoneNumber = builder.cellphoneNumber;
    }


    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getCellphoneNumber() {
        return cellphoneNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Admin admin = (Admin) o;
        return Objects.equals(password, admin.password) &&
                Objects.equals(firstName, admin.firstName) &&
                Objects.equals(lastName, admin.lastName) &&
                Objects.equals(email, admin.email) &&
                Objects.equals(cellphoneNumber, admin.cellphoneNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash( password, firstName, lastName, email, cellphoneNumber);
    }

    @Override
    public String toString() {
        return "Admin{" +
                "password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", cellphoneNumber='" + cellphoneNumber + '\'' +
                '}';
    }

    public static class Builder {

        private String password;
        private String firstName;
        private String lastName;
        private String email;
        private String cellphoneNumber;



        public Builder setPassword(String password) {
            this.password = password;
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

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setCellphoneNumber(String cellphoneNumber) {
            this.cellphoneNumber = cellphoneNumber;
            return this;
        }

        public Builder copy(Admin admin) {
            this.password = admin.password;
            this.firstName = admin.firstName;
            this.lastName = admin.lastName;
            this.email = admin.email;
            this.cellphoneNumber = admin.cellphoneNumber;
            return this;
        }

        public Admin build() {
            return new Admin(this);
        }
    }
}

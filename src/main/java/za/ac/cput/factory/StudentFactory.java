package za.ac.cput.factory;

import za.ac.cput.domain.Student;
import za.ac.cput.util.Helper;

/**
 * StudentFactory.java
 * This is the Factory class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 08 July 2024
 */

public class StudentFactory {
    public static Student buildStudent(String firstName, String lastName, int age, String email, String cellNumber, String password){
        if( Helper.isNullOrEmpty(firstName) || Helper.isNullOrEmpty(lastName)|| Helper.isIntNotValid(age) ||
                !Helper.isValidEmail(email) || !Helper.isValidCellNumber(cellNumber) || Helper.isNullOrEmpty(password)){
            return null;
        }

        return new Student.Builder()
                .setFirstName(firstName)
                .setLastName(lastName)
                .setAge(age)
                .setEmail(email)
                .setCellNumber(cellNumber)
                .setPassword(password)
                .build();
    }
}

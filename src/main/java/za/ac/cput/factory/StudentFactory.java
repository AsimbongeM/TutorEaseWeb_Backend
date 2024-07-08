package za.ac.cput.factory;

import za.ac.cput.domain.Student;
import za.ac.cput.util.Helper;

public class StudentFactory {
    public static Student buildStudent(Long studentId, String firstName, String lastName, int age, String email, String cellNumber, String password){
        if(Helper.isLong(studentId) || Helper.isNullOrEmpty(firstName) || Helper.isNullOrEmpty(lastName)|| Helper.isIntNotValid(age) ||
                Helper.isNullOrEmpty(email) || Helper.isNullOrEmpty(cellNumber) || Helper.isNullOrEmpty(password)){
            return null;
        }

        return new Student.Builder()
                .setId(studentId)
                .setFirstName(firstName)
                .setLastName(lastName)
                .setAge(age)
                .setEmail(email)
                .setCellNumber(cellNumber)
                .setPassword(password)
                .build();
    }
}

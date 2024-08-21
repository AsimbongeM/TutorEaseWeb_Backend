package za.ac.cput.factory;

import za.ac.cput.domain.Admin;
import za.ac.cput.util.Helper;

/**
 * AdminFactory.java
 * This is the admin Factory class with additional fields
 * @author Siyanda Mthimkhulu
 * Date: 16 July 2024
 */

public class AdminFactory {
    public static Admin buildAdmin(String password, String firstName, String lastName, String email, String cellphoneNumber) {
        if ( Helper.isNullOrEmpty(password)
                || Helper.isNullOrEmpty(firstName)
                || Helper.isNullOrEmpty(lastName)
                || !Helper.isValidEmail(email)
                || Helper.isNullOrEmpty(cellphoneNumber)) {
            return null;
        }
        return new Admin.Builder()
                .setPassword(password)
                .setFirstName(firstName)
                .setLastName(lastName)
                .setEmail(email)
                .setCellphoneNumber(cellphoneNumber)
                .build();
    }
}

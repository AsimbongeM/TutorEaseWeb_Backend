package za.ac.cput.factory;

import za.ac.cput.domain.Admin;
import za.ac.cput.util.Helper;

/**
 * AdminFactory.java
 * This is the admin Factory class with minimal info for now
 * @author Siyanda Mthimkhulu (220148279)
 * Date: 16 July 2024
 */

public class AdminFactory {
    public static Admin buildAdmin(String username, String password) {
        if (Helper.isNullOrEmpty(username)
                || Helper.isNullOrEmpty(password))
                {
            return null;
        }
     return new Admin.Builder()
             .setUsername(username)
             .setPassword(password)
             .build();
    }
}

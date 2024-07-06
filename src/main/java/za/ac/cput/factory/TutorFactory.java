package za.ac.cput.factory;

import za.ac.cput.domain.Tutor;
import za.ac.cput.util.Helper;

public class TutorFactory {
    public static Tutor buildTutor(String firstName, String lastName, int age, String email, String cellNumber, String password, String skills, int experience, byte[] idDocument, byte[] sarsDocument, boolean isApproved) {
        if (idDocument == null || idDocument.length == 0) {
            idDocument = new byte[1];
        }
        if (sarsDocument == null || sarsDocument.length == 0) {
            sarsDocument = new byte[1];
        }
        if (Helper.isNullOrEmpty(firstName)
                || Helper.isNullOrEmpty(lastName)
                || age < 0 || !Helper.isValidEmail(email)
                || !Helper.isValidCellNumber(cellNumber)
                || Helper.isNullOrEmpty(password)
                || Helper.isNullOrEmpty(skills)
                || experience < 0) {
            return null;
        }
        return new Tutor.Builder()
                .setFirstName(firstName)
                .setLastName(lastName)
                .setAge(age)
                .setEmail(email)
                .setCellNumber(cellNumber)
                .setPassword(password)
                .setSkills(skills)
                .setExperience(experience)
                .setIdDocument(idDocument)
                .setSarsDocument(sarsDocument)
                .setApproved(isApproved)
                .build();
    }
}

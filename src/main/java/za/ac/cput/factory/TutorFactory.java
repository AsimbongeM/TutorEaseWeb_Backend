package za.ac.cput.factory;

import za.ac.cput.domain.Tutor;
import za.ac.cput.domain.TutorApprovalStatus;
import za.ac.cput.util.Helper;

public class TutorFactory {
    public static Tutor buildTutor(String firstName, String lastName, String email,int age,  String cellNumber, String password, String skills, int experience,TutorApprovalStatus approvalStatus) {
//        if (profilePicture == null || profilePicture.length == 0) {
//            profilePicture = new byte[1];
//        }
//        if (idDocument == null || idDocument.length == 0) {
//            idDocument = new byte[1];
//        }
//        if (sarsDocument == null || sarsDocument.length == 0) {
//            sarsDocument = new byte[1];
//        }
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
//                .setProfilePicture(profilePicture)
//                .setIdDocument(idDocument)
//                .setSarsDocument(sarsDocument)
                .setApprovalStatus(approvalStatus)
                .build();
    }
}

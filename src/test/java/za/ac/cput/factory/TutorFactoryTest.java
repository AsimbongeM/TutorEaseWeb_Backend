package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Tutor;
import za.ac.cput.domain.TutorApprovalStatus;

import static org.junit.jupiter.api.Assertions.*;

class TutorFactoryTest {

    @Test
    void buildTutor() {
        byte[] profilePicture = new byte[0];
//        byte[] idDocument = new byte[0];
//        byte[] sarsDocument = new byte[0];
        Tutor tutor=TutorFactory.buildTutor("Asimbonge","Mbende","asi@gmail.com",40,"0671234859","12345",profilePicture,"Java:Advanced"
        ,3,TutorApprovalStatus.APPROVED);
        assertNotNull(tutor);
        assertEquals(TutorApprovalStatus.APPROVED, tutor.getApprovalStatus());
        System.out.println("Created; "+tutor);
    }    @Test
    void buildTutorPending() {
        byte[] profilePicture = new byte[0];
//        byte[] idDocument = new byte[0];
//        byte[] sarsDocument = new byte[0];
        Tutor tutor=TutorFactory.buildTutor("Kgomotso","Maluleke","malu@gmail.com",36,"0671234899","12345",profilePicture,"Java:Beginner"
        ,4,TutorApprovalStatus.PENDING);
        assertNotNull(tutor);
        assertEquals(TutorApprovalStatus.PENDING, tutor.getApprovalStatus());
        System.out.println("Created; "+tutor);
    }
    @Test
    void buildTutorDecline() {
        byte[] profilePicture = new byte[0];
//        byte[] idDocument = new byte[0];
//        byte[] sarsDocument = new byte[0];
        Tutor tutor=TutorFactory.buildTutor("Thando","Maluleke","tm@gmail.com",26,"0671234889","12345",profilePicture,"Java:Intermediate"
        ,3,TutorApprovalStatus.DECLINED);
        assertNotNull(tutor);
        assertEquals(TutorApprovalStatus.DECLINED, tutor.getApprovalStatus());
        System.out.println("Created; "+tutor);
    }
    @Test
    void buildTutorThatFails() {
        byte[] profilePicture = new byte[0];
//        byte[] idDocument = new byte[0];
//        byte[] sarsDocument = new byte[0];
        Tutor tutor=TutorFactory.buildTutor("Lucia","Maluleke","l@.com",26,"0671234889","12345",profilePicture,"Java:Intermediate"
        ,3, TutorApprovalStatus.DECLINED);
        assertNotNull(tutor);
        assertEquals(TutorApprovalStatus.DECLINED, tutor.getApprovalStatus());
        System.out.println("Created; "+tutor);
    }
}
package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Tutor;

import static org.junit.jupiter.api.Assertions.*;

class TutorFactoryTest {

    @Test
    void buildTutor() {
        byte[] idDocument = new byte[0];
        byte[] sarsDocument = new byte[0];
        Tutor tutor=TutorFactory.buildTutor("Asimbonge","Mbende",40,"asi@gmail.com","0671234859","12345"
        ,"Java:Advanced",3,idDocument,sarsDocument,false );
        assertNotNull(tutor);
        System.out.println("Created; "+tutor);
    }
}
package za.ac.cput.service;

import za.ac.cput.domain.Student;

import java.util.List;

/**
 * IStudentService.java
 * This is the Service class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 08 July 2024
 */

public interface IStudentService extends IService <Student, Long>{
    List <Student> getAll();
}

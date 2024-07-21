package za.ac.cput.service;

import za.ac.cput.domain.BookSession;

import java.util.List;

public interface IBookSessionService extends IService<BookSession,Long> {
    List<BookSession> getAll();
}

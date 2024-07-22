package za.ac.cput.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import za.ac.cput.domain.ScheduleSession;
import za.ac.cput.repository.ScheduleSessionRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ScheduleSessionServiceTest {

    @Mock
    private ScheduleSessionRepository scheduleSessionRepository;

    @InjectMocks
    private ScheduleSessionService scheduleSessionService;

    private ScheduleSession session;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        session = new ScheduleSession.Builder()
                .setId(1L)
                .setDate(LocalDate.of(2024, 7, 21))
                .setStartTime(LocalTime.of(10, 0))
                .setEndTime(LocalTime.of(12, 0))
                .setTopic("Design patterns")
                .build();
    }

    @Test
    void getAll() {
        List<ScheduleSession> sessions = Arrays.asList(session);
        when(scheduleSessionRepository.findAll()).thenReturn(sessions);
        List<ScheduleSession> result = scheduleSessionService.getAll();
        assertEquals(1, result.size());
        verify(scheduleSessionRepository, times(1)).findAll();
    }

    @Test
    void create() {
        when(scheduleSessionRepository.save(any(ScheduleSession.class))).thenReturn(session);
        ScheduleSession created = scheduleSessionService.create(session);
        assertNotNull(created);
        assertEquals(session.getId(), created.getId());
        verify(scheduleSessionRepository, times(1)).save(session);
    }

    @Test
    void read() {
        when(scheduleSessionRepository.findById(1L)).thenReturn(Optional.of(session));
        ScheduleSession found = scheduleSessionService.read(1L);
        assertNotNull(found);
        assertEquals(session.getId(), found.getId());
        verify(scheduleSessionRepository, times(1)).findById(1L);
    }

    @Test
    void update() {
        when(scheduleSessionRepository.existsById(session.getId())).thenReturn(true);
        when(scheduleSessionRepository.save(any(ScheduleSession.class))).thenReturn(session);
        ScheduleSession updated = scheduleSessionService.update(session);
        assertNotNull(updated);
        assertEquals(session.getId(), updated.getId());
        verify(scheduleSessionRepository, times(1)).save(session);
    }

    @Test
    void delete() {
        when(scheduleSessionRepository.existsById(1L)).thenReturn(true);
        doNothing().when(scheduleSessionRepository).deleteById(1L);
        scheduleSessionService.delete(1L);
        verify(scheduleSessionRepository, times(1)).deleteById(1L);
    }
}

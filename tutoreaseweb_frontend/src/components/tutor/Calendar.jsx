import React, { useState } from 'react';

const Calendar = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Updated public holidays with names
    const publicHolidays = [
        { date: new Date(currentYear, 0, 1), name: 'New Year\'s Day' },
        { date: new Date(currentYear, 2, 21), name: 'Human Rights Day' },
        { date: new Date(currentYear, 2, 29), name: 'Good Friday' },   // Easter holiday (date varies)
        { date: new Date(currentYear, 3, 1), name: 'Family Day' },     // Easter holiday (date varies)
        { date: new Date(currentYear, 3, 27), name: 'Freedom Day' },
        { date: new Date(currentYear, 4, 1), name: 'Workers\' Day' },
        { date: new Date(currentYear, 5, 16), name: 'Youth Day' },
        { date: new Date(currentYear, 7, 9), name: 'National Women\'s Day' },
        { date: new Date(currentYear, 8, 24), name: 'Heritage Day' },
        { date: new Date(currentYear, 11, 16), name: 'Day of Reconciliation' },
        { date: new Date(currentYear, 11, 25), name: 'Christmas Day' },
        { date: new Date(currentYear, 11, 26), name: 'Day of Goodwill' }
    ];

    const startDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
        setSelectedDate(null);
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
        setSelectedDate(null);
    };

    const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });
    const currentDay = today.getDate();
    const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();

    const isWeekend = (dayIndex) => dayIndex === 0 || dayIndex === 6;

    const getHolidayName = (date) => {
        const holiday = publicHolidays.find(holiday =>
            holiday.date.getDate() === date &&
            holiday.date.getMonth() === currentMonth &&
            holiday.date.getFullYear() === currentYear
        );
        return holiday ? holiday.name : null;
    };

    return (
        <div style={{
            backgroundColor: '#f5f5f5',
            color: '#333',
            borderRadius: '8px',
            width: '500px',
            padding: '20px'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
            }}>
                <button onClick={handlePrevMonth} style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#333',
                    cursor: 'pointer',
                    fontSize: '20px'
                }}>&lt;</button>
                <h5 style={{ margin: 0 }}>{monthName} {currentYear}</h5>
                <button onClick={handleNextMonth} style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#333',
                    cursor: 'pointer',
                    fontSize: '20px'
                }}>&gt;</button>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px'
            }}>
                {days.map((day, index) => (
                    <div key={index} style={{
                        width: 'calc(100% / 7)',
                        textAlign: 'center',
                        fontWeight: isWeekend(index) ? 'bold' : 'normal'
                    }}>{day}</div>
                ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {Array(startDay).fill(null).map((_, index) => (
                    <div key={index} style={{ width: 'calc(100% / 7)' }}></div>
                ))}
                {dates.map((date, index) => {
                    const isToday = isCurrentMonth && date === currentDay;
                    const isSelected = date === selectedDate;
                    const dayIndex = (startDay + index) % 7;
                    const holidayName = getHolidayName(date);

                    return (
                        <div
                            key={index}
                            style={{
                                width: 'calc(100% / 7)',
                                textAlign: 'center',
                                padding: '10px',
                                cursor: 'pointer',
                                borderRadius: '50%',
                                backgroundColor: isSelected || isToday ? '#00274d' : 'transparent',
                                color: isWeekend(dayIndex) || holidayName ? 'red' : (isSelected || isToday ? 'white' : '#333'),
                                fontWeight: isToday ? 'bold' : 'normal'
                            }}
                            onClick={() => setSelectedDate(date)}
                            title={holidayName ? holidayName : ''}
                        >
                            {date}
                        </div>
                    );
                })}
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: '20px'
            }}>
                <button style={{
                    backgroundColor: '#d32f2f',
                    border: 'none',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '4px'
                }}>
                    Focus
                </button>

            </div>
        </div>
    );
};

export default Calendar;

import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Events from './Events';
import Week from './Week';
import DayNames from './DayNames';
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { RiAddBoxFill, RiArrowLeftCircleFill } from "react-icons/ri";

import "./styles/calendar.scss";

function Calendar() {
    const [selectedMonth, setSelectedMonth] = useState(moment());
    const [selectedDay, setSelectedDay] = useState(moment().startOf("day"));
    const [selectedMonthEvents, setSelectedMonthEvents] = useState([]);
    const [showEvents, setShowEvents] = useState(false);

    useEffect(() => {
        initialiseEvents();
    }, []);

    const previous = () => {
        setSelectedMonth(selectedMonth.clone().subtract(1, "month"));
    };

    const next = () => {
        setSelectedMonth(selectedMonth.clone().add(1, "month"));
    };

    const select = (day) => {
        setSelectedMonth(day.date);
        setSelectedDay(day.date.clone());
        setShowEvents(true);
    };

    const goToCurrentMonthView = () => {
        setSelectedMonth(moment());
    };

    const showCalendar = () => {
        setSelectedMonth(selectedMonth);
        setSelectedDay(selectedDay);
        setShowEvents(false);
    };

    const renderMonthLabel = () => {
        return (
            <span className="box month-label">{selectedMonth.format("MMMM YYYY")}</span>
        );
    };

    const renderDayLabel = () => {
        return (
            <span className="box month-label">
                {selectedDay.format("DD MMMM YYYY")}
            </span>
        );
    };

    const renderTodayLabel = () => {
        return (
            <span className="box today-label" onClick={goToCurrentMonthView}>
                Today
            </span>
        );
    };

    const renderWeeks = () => {
        const currentSelectedDay = selectedDay;
        const monthEvents = selectedMonthEvents;
        let weeks = [];
        let done = false;
        let previousCurrentNextView = selectedMonth
            .clone()
            .startOf("month")
            .subtract(1, "d")
            .day("Monday");
        let count = 0;
        let monthIndex = previousCurrentNextView.month();

        while (!done) {
            weeks.push(
                <Week
                    key={previousCurrentNextView.format("YYYY-MM-DD")}
                    previousCurrentNextView={previousCurrentNextView.clone()}
                    currentMonthView={selectedMonth}
                    monthEvents={monthEvents}
                    selected={currentSelectedDay}
                    select={select}
                />
            );
            previousCurrentNextView.add(1, "w");
            done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
            monthIndex = previousCurrentNextView.month();
        }
        return weeks;
    };

    const handleAdd = () => {
        const currentSelectedDate = selectedDay;

        const eventTitle = prompt("Please enter a name for your event: ");

        if (eventTitle === null) {
            alert("Changed your mind? You can add one later!");
        } else if (eventTitle !== "") {
            const newEvent = {
                title: eventTitle,
                date: currentSelectedDate,
                dynamic: true,
            };

            setSelectedMonthEvents((prevEvents) => [...prevEvents, newEvent]);
        }
    };

    const addEvent = () => {
        const currentSelectedDate = selectedDay;
        const isAfterDay = moment().startOf("day").subtract(1, "d");

        if (currentSelectedDate.isAfter(isAfterDay) || window.confirm("Are you sure you want to add an event in the past?")) {
            handleAdd();
        }
    };

    const removeEvent = (i) => {
        const monthEvents = selectedMonthEvents.slice();
        if (window.confirm("Are you sure you want to remove this event?")) {
            let index = i;
            if (index !== -1) {
                monthEvents.splice(index, 1);
            } else {
                alert("No events to remove on this day!");
            }
            setSelectedMonthEvents([...monthEvents]);
        }
    };

    const initialiseEvents = () => {
        let allEvents = [];
        var event1 = {
            title:
                "Press the Add button and enter a name for your event. P.S you can delete me by pressing me!",
            date: moment(),
            dynamic: false,
        };
        // ... (other events)
        allEvents.push(event1);
        // ... (push other events)
        setSelectedMonthEvents(allEvents);
    };
    const showEventsView = () => (
        <section className="main-calendar">
            <header className="calendar-header">
                <div className="row title-header">{renderDayLabel()}</div>
                <div className="row button-container flex justify-evenly">
                    <RiArrowLeftCircleFill onClick={showCalendar} className="box event-button " />
                    <RiAddBoxFill onClick={addEvent} className="box event-button " />
                </div>
            </header>
            <Events
                selectedMonth={selectedMonth}
                selectedDay={selectedDay}
                selectedMonthEvents={selectedMonthEvents}
                removeEvent={removeEvent}
            />
        </section>
    );

    const calendarView = (
        <section className="main-calendar">
            <header className="calendar-header">
                <div className="row title-header flex justify-evenly">
                    <BsArrowLeftShort onClick={previous} className='cursor-pointer' />
                    <div className="box header-text">
                        {renderTodayLabel()}
                        {renderMonthLabel()}
                    </div>
                    <BsArrowRightShort onClick={next} className='cursor-pointer' />
                </div>
                <DayNames />
            </header>
            <div className="days-container">{renderWeeks()}</div>
        </section>
    );

    return showEvents ? showEventsView() : calendarView;
}

export default Calendar
import React from 'react'

function Day(props) {
    const day = props.day;
    const selected = props.selected;
    const select = props.select;

    // Log the relevant data for debugging

    return (
        <div
            className={
                "day" +
                (day.isToday ? " today" : "") +
                (day.isCurrentMonth ? "" : " different-month") +
                (day.date.isSame(selected) ? " selected" : "") +
                (day.hasEvents ? " has-events" : "")
            }
            onClick={() => select(day)}
        >
            <div className="day-number">{day.number}</div>
        </div>
    );
}

export default Day
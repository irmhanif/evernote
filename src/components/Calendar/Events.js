import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Events(props) {
    const currentSelectedDay = props.selectedDay;
    const monthEvents = props.selectedMonthEvents;
    const removeEvent = props.removeEvent;

    const monthEventsRendered = monthEvents.map((event, i) => {
        return (
            <div
                key={event.title}
                className="event-container"
                onClick={() => removeEvent(i)}
                data-date={event.date}
            >
                <TransitionGroup
                    component="div"
                    classNames="animated-time"
                    transitionName="time"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <CSSTransition>
                        <div className="event-time event-attribute">
                            {event.date.format("HH:mm")}
                        </div>
                    </CSSTransition>
                </TransitionGroup>
                <TransitionGroup
                    component="div"
                    classNames="animated-title"
                    transitionName="title"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <div className="event-title event-attribute">{event.title}</div>
                </TransitionGroup>
            </div>
        );
    });

    const dayEventsRendered = monthEventsRendered.filter((event) => {
        if (event.props['data-date'] && event.props['data-date'].isSame) {
            return event.props['data-date'].isSame(currentSelectedDay, "day");
        }
        return false;
    });

    return <div className="day-events">{dayEventsRendered}</div>;
}

export default Events
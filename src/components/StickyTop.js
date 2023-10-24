import React, { useState } from 'react'
import cs from 'classnames';
import { getTimeOfDay } from '../helpers';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import Calendar from './Calendar';
import { Button } from 'antd/es';
import { CalendarFilled } from '@ant-design/icons';
// import Calendar from 'react-calendar';

function StickyTop(props) {
    const { textStyle } = props;
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    // const [value, onChange] = useState(new Date());

    return (
        <>
            <div className={cs('flex justify-between absolute top-0 left-0 w-full p-4 stickyHeader')} style={textStyle}>
                <h3>Good {getTimeOfDay()}, Mohamed!</h3>
                <div className={cs('datTimeContainer relative')}>
                    <Button type="primary" icon={<CalendarFilled />} onClick={toggleVisibility}>
                        {moment().format('dddd, D MMMM YYYY')}
                    </Button>
                    {isVisible && (
                        <div className={cs('calendarContainer absolute right-0')}>
                            <Calendar />
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default StickyTop
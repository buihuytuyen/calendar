import dayjs from 'dayjs';
import React from 'react';
import Day from './Day';

export default function Month({ month, monthIndex }) {
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, monthIndex, 1)).day();
    let rows =
        firstDayOfTheMonth + dayjs(monthIndex).daysInMonth() > 35 ? 6 : 5;
    return (
        <div className={`flex-1 grid grid-cols-7 grid-rows-${rows}`}>
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, index) => (
                        <Day day={day} key={index} rowIdx={i} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}

import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getMonthSmall } from '../../util';
import GlobalContext from '../../context/GlobalContext';

export default function SmallCalendar() {
    const {
        monthIndex,
        setSmallCalendarMonth,
        currentMonthIndex,
        setCurrentMonthIndex,
        daySelected,
        setDaySelected,
    } = useContext(GlobalContext);

    const [currentMonth, setCurrentMonth] = useState(getMonthSmall());

    useEffect(() => {
        setCurrentMonth(getMonthSmall(currentMonthIndex));
    }, [currentMonthIndex]);

    useEffect(() => {
        setCurrentMonthIndex(monthIndex);
    }, [monthIndex, setCurrentMonthIndex]);

    const handlePrevMonth = () => {
        setCurrentMonthIndex(currentMonthIndex - 1);
    };

    const handleNextMonth = () => {
        setCurrentMonthIndex(currentMonthIndex + 1);
    };

    const getDayClass = (day) => {
        const format = 'DD-MM-YY';
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const selectedDay = daySelected && daySelected.format(format);

        if (nowDay === currDay) {
            return 'bg-blue-500 rounded-full text-white';
        } else if (currDay === selectedDay) {
            return 'bg-blue-100 rounded-full text-blue-600 font-bold';
        } else {
            return '';
        }
    };

    return (
        <div className="mt-9">
            <header className="flex justify-between items-center pl-4">
                <p className="text-gray-500 font-bold text-lg">
                    {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
                        'MMMM, YYYY'
                    )}
                </p>

                <div className="flex items-center">
                    <button
                        className="flex items-center"
                        onClick={() => {
                            handlePrevMonth();
                        }}
                    >
                        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                            chevron_left
                        </span>
                    </button>

                    <button
                        className="flex items-center"
                        onClick={() => {
                            handleNextMonth();
                        }}
                    >
                        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                            chevron_right
                        </span>
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-7 grid-rows-7">
                {currentMonth[0].map((day, i) => (
                    <span key={i} className="text-lg py-1 text-center">
                        {day.format('dd')}
                    </span>
                ))}
                {currentMonth.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <button
                                key={idx}
                                className={`py-3  ${getDayClass(day)}`}
                                onClick={() => {
                                    setSmallCalendarMonth(currentMonthIndex);
                                    setDaySelected(day);
                                }}
                            >
                                <p
                                    className={`text-lg ${
                                        currentMonthIndex % 12 === day.month()
                                            ? 'font-bold'
                                            : 'font-medium'
                                    }`}
                                >
                                    {day.format('D')}
                                </p>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

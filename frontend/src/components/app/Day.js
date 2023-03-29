import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { LunarDate } from 'vietnamese-lunar-calendar';

export default function Day({ day, rowIdx }) {
    const {
        monthIndex,
        setDaySelected,
        setShowEventModal,
        filteredEvents,
        setSelectedEvent,
    } = useContext(GlobalContext);
    const [dayEvents, setDayEvents] = useState([]);

    useEffect(() => {
        const events = filteredEvents.filter(
            (evt) =>
                dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
        );
        setDayEvents(events);
    }, [filteredEvents, day]);

    const dayOfMonthIndex = () =>
        monthIndex % 12 === day.month() ? 'font-bold' : 'font-medium';

    const getCurrentDayClass = () => {
        return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
            ? 'bg-blue-600  text-white rounded-full w-9'
            : '';
    };

    return (
        <div className="border border-color flex flex-col">
            <header className="flex flex-col items-center">
                {rowIdx === 0 && (
                    <p className="text-xl mt-1 font-semibold">
                        {day.format('ddd').toUpperCase()}
                    </p>
                )}
                <p
                    className={`text-xl  p-1 my-1 text-center  ${getCurrentDayClass()} ${dayOfMonthIndex()} `}
                >
                    {day.format('D') === '1'
                        ? `1 thg ${day.month() + 1}`
                        : day.format('D')}
                </p>
                <p>
                    {new LunarDate(day.year(), day.month() + 1, day.date())
                        .date === 1
                        ? `${
                              new LunarDate(
                                  day.year(),
                                  day.month() + 1,
                                  day.date()
                              ).date
                          }/${
                              new LunarDate(
                                  day.year(),
                                  day.month() + 1,
                                  day.date()
                              ).month
                          }`
                        : new LunarDate(day.year(), day.month() + 1, day.date())
                              .date}
                </p>
            </header>
            <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                    setDaySelected(day);
                    setShowEventModal(true);
                }}
            >
                {dayEvents.map((evt, idx) => (
                    <div
                        key={idx}
                        onClick={() => {
                            setSelectedEvent(evt);
                        }}
                        className={`bg-${evt.label}-200 p-1 text-gray-600 text-2xl rounded mb-1 truncate h-12`}
                    >
                        {evt.title}
                    </div>
                ))}
            </div>
        </div>
    );
}

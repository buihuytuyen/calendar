import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { getMonth } from '../../util';
import CalendarHeader from './CalendarHeader';
import EventModal from './EventModal';
import Month from './Month';
import Sidebar from './Sidebar';

export default function HomePage() {
    const [currentMonth, setCurrentMonth] = useState(getMonth());

    const { monthIndex, showEventModal } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <>
            {showEventModal && <EventModal />}
            <div className="h-screen flex flex-col">
                <CalendarHeader />
                <div className="flex flex-1">
                    <Sidebar />
                    <Month month={currentMonth} monthIndex={monthIndex} />
                </div>
            </div>
        </>
    );
}

import dayjs from 'dayjs';
import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';

export default function CalendarHeader() {
    const navigate = useNavigate();

    const { monthIndex, setMonthIndex, setCurrentMonthIndex, user } =
        useContext(GlobalContext);
    console.log(user);
    const [isLoggedin, setIsLoggedin] = useState(true);

    const handlePrevMonth = () => {
        setMonthIndex(monthIndex - 1);
    };

    const handleNextMonth = () => {
        setMonthIndex(monthIndex + 1);
    };

    const handleReset = () => {
        setMonthIndex(dayjs().month());
        setCurrentMonthIndex(dayjs().month());
    };

    const logout = () => {
        localStorage.removeItem('token-info');
        setIsLoggedin(false);
        navigate('/login');
    };

    return (
        <header className="px-2 py-2 flex items-center h-6.4">
            {/* icon */}
            <div className="flex items-center">
                <div className="ml-1 w-14 h-14 flex items-center justify-center hover:bg-background-btn hover:rounded-full">
                    <svg
                        focusable="false"
                        viewBox="0 0 24 24"
                        className="w-8 h-8"
                    >
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                    </svg>
                </div>

                <h1 className="text-2xl text-gray-900 font-medium">Calendar</h1>
            </div>

            {/* Reset Month */}
            <div className="ml-4 mr-4">
                <button
                    className="rounded border text-2xl p-2 pr-4 pl-4 font-bold"
                    onClick={handleReset}
                >
                    Hôm nay
                </button>
            </div>

            {/* Pre, Next month */}
            <div className="flex">
                <button
                    onClick={handlePrevMonth}
                    className="flex items-center hover:bg-background-btn hover:rounded-full"
                >
                    <span className="material-icons-outlined cursor-pointer text-gray-600">
                        chevron_left
                    </span>
                </button>

                <button
                    onClick={handleNextMonth}
                    className="flex items-center hover:bg-background-btn hover:rounded-full bu"
                >
                    <span className="material-icons-outlined cursor-pointer text-gray-600">
                        chevron_right
                    </span>
                </button>
            </div>

            {/* Show month, year */}
            <div>
                <h2 className="ml-4 text-gray-500 text-2xl font-bold">
                    {dayjs(new Date(dayjs().year(), monthIndex)).format(
                        'MMMM, YYYY'
                    )}
                </h2>
            </div>
            <div className="ml-4 mr-4 absolute right-10 flex items-center">          
                <span className="material-symbols-outlined rounded-full border text-3xl p-2 pr-4 pl-4 font-bold">
                    person
                </span>
                <h1 className="text-xl mr-3 font-medium">{user.username}</h1>
                <button className="rounded-full border" onClick={logout}>
                    <span className="material-symbols-outlined text-3xl p-2 pr-4 pl-4 font-bold">
                        logout
                    </span>
                </button>
            </div>
        </header>
    );
}

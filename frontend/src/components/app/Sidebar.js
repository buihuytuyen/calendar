import React from 'react';
import CreateEventButton from './CreateEventButton';
import SmallCalendar from './SmallCalendar';
import Labels from './Labels';

export default function Sidebar() {
    return (
        <aside className="border border-color p-5 w-25.6">
            <CreateEventButton />
            <SmallCalendar />
            <Labels />
        </aside>
    );
}

import React, { useState } from 'react';
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { useFormik } from 'formik';
import axios from 'axios';

const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

export default function EventModal() {
    const { user, setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
        useContext(GlobalContext);

    // const [title, setTitle] = useState(
    //     selectedEvent ? selectedEvent.title : ''
    // );
    // const [location, setLocation] = useState(
    //     selectedEvent ? selectedEvent.location : ''
    // );
    // const [description, setDescription] = useState(
    //     selectedEvent ? selectedEvent.description : ''
    // );
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[0]
    );

    console.log(user)

    const formik = useFormik({
        initialValues: {
            title : '',
            startTimeUtc : '',
            endTimeUtc : '',
            created : user.userId,
            isAllDay : false,
            location : '',
            decryption : '',
            eventStatus : labelsClasses[0],

        },

        // Submit
        onSubmit: (values) => {
            console.log(values);
            axios
                .post('http://127.0.0.1:8000/api/eventCRUD', values)
                .then((res) => {
                    alert('Create event Success!');
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });

    if(selectedEvent && selectedEvent.status){
        formik.values.title = selectedEvent.title
        formik.values.startTimeUtc = selectedEvent.start
        formik.values.endTimeUtc = selectedEvent.end
        formik.values.location = selectedEvent.location
        formik.values.decryption = selectedEvent.description
        formik.values.eventStatus = labelsClasses.find((lbl) => lbl === selectedEvent.label)
        selectedEvent.status = false
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = formik.values.title
        const start = formik.values.startTimeUtc
        const end = formik.values.endTimeUtc
        const location = formik.values.location
        const description = formik.values.decryption
        const label = formik.values.eventStatus
        

        const calendarEvent = {
            title,
            start,
            end,
            location,
            description,
            label,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
            status: true
        };

        if (selectedEvent) {
            dispatchCalEvent({ type: 'update', payload: calendarEvent });
        } else {
            dispatchCalEvent({ type: 'push', payload: calendarEvent });
        }
        setShowEventModal(false);
        formik.handleSubmit();
    };

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
                <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                    <span className="material-icons-outlined text-gray-400">
                        drag_handle
                    </span>
                    <div>
                        {selectedEvent && (
                            <span
                                className="material-icons-outlined text-gray-400 cursor-pointer"
                                onClick={() => {
                                    dispatchCalEvent({
                                        type: 'delete',
                                        payload: selectedEvent,
                                    });
                                    setShowEventModal(false);
                                }}
                            >
                                delete
                            </span>
                        )}
                        <button
                            onClick={() => {
                                setShowEventModal(false);
                            }}
                        >
                            <span className="material-icons-outlined text-gray-400">
                                close
                            </span>
                        </button>
                    </div>
                </header>
                <div className="p-3">
                    <div className="grid grid-cols-1/5 items-end gap-y-7">
                        <div></div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Thêm tiêu đề"
                            value={formik.values.title}
                            onChange={formik.handleChange('title')}
                            required
                            className="pt-3 border-0 text-gray-600 text-2xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                        <span className="material-icons-outlined text-gray-400">
                            calendar_month
                        </span>
                        <p className = "text-2xl text-gray-600 ml-3">{daySelected.format('dddd, D MMMM')}</p>
                        <span className="material-icons-outlined text-gray-400">
                            schedule
                        </span>
                        <input
                            type="text"
                            name="startTimeUtc"
                            placeholder="Thời gian bắt đầu"
                            value={formik.values.startTimeUtc}
                            onChange={formik.handleChange('startTimeUtc')}
                            required
                            className="pt-3 border-0 text-gray-600 pb-2 w-full text-xl border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                        <span className="material-icons-outlined text-gray-400">
                            schedule
                        </span>
                        <input
                            type="text"
                            name="endTimeUtc"
                            placeholder="Thời gian kết thúc"
                            value={formik.values.endTimeUtc}
                            onChange={formik.handleChange('endTimeUtc')}
                            required
                            className="pt-3 border-0 text-gray-600 pb-2 w-full text-xl border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                        <span className="material-icons-outlined text-gray-400">
                            location_on
                        </span>
                        <input
                            type="text"
                            name="location"
                            placeholder="Thêm vị trí"
                            value={formik.values.location}
                            onChange={formik.handleChange('location')}
                            required
                            className="pt-3 border-0 text-gray-600 pb-2 w-full text-xl border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                        <span className="material-icons-outlined text-gray-400">
                            segment
                        </span>
                        <input
                            type="text"
                            name="description"
                            placeholder="Thêm mô tả"
                            value={formik.values.decryption}
                            onChange={formik.handleChange('decryption')}
                            required
                            className="pt-3 border-0 text-gray-600  pb-2 w-full text-xl border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                        <span className="material-icons-outlined text-gray-400">
                            bookmark_border
                        </span>
                        <div className="flex gap-x-2">
                            {labelsClasses.map((lblClass, i) => (
                                <span
                                    key={i}
                                    className={`bg-${lblClass}-500 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer`}
                                    onClick={() => {
                                        formik.values.eventStatus = lblClass;
                                        formik.handleChange('eventStatus');
                                        setSelectedLabel(
                                            formik.values.eventStatus
                                        );
                                    }}
                                >
                                    {selectedLabel === lblClass && (
                                        <span className="material-icons-outlined text-white text-sm">
                                            check
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className="flex justify-end border-t p-3 mt-5">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                        onClick={handleSubmit}
                    >
                        Lưu
                    </button>
                </footer>
            </form>
        </div>
    );
}

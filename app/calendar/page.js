"use client";

import { useEffect, useState, useRef } from "react";
import {
    Calendar,
    Button,
    Card,
    CardBody
} from "@nextui-org/react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import { parseDate } from "@internationalized/date";
import { todayFormattedDate } from "@/lib/date";
import PlusIcon from "../../public/plus.svg";
import Grid from "../../public/grid.svg";
import DropdownMenu from "../components/DropdownMenu";
import ModalAddEvent from "../components/ModalAddEvent";
import ModalDeleteEvent from "../components/ModalDeleteEvent";

function renderEventContent(eventInfo) {

    let newTimeText
    if (eventInfo.timeText && eventInfo.timeText.includes('a')) {
        newTimeText = eventInfo.timeText.replace('a', 'am')

    } else if (eventInfo.timeText && eventInfo.timeText.includes('p')) {
        newTimeText = eventInfo.timeText.replace('p', 'pm')

    }
    return (
        <>
            <b>{newTimeText}&nbsp;</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAddEventOpen, setIsAddEventOpen] = useState(false);
    const [isDeleteEventOpen, setIsDeleteEventOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [eventDate, setEventDate] = useState();
    const [detailEvent, setDetailEvent] = useState();
    const [eventInfo, setEventInfo] = useState();
    const [deletedInfo, setDeletedInfo] = useState();
    const [countEvent, setCountEvent] = useState(0);

    const [events, setEvents] = useState([]);

    const calendarRef = useRef(null);
    const newDate = new Date();

    useEffect(() => {
        const value = todayFormattedDate(newDate)
        setEventDate(value)

        // Recalculate or resize the FullCalendar size when sidebar toggles
        const resizeCalendar = () => {
            if (calendarRef.current) {
                calendarRef.current.getApi().updateSize();
            }
        };

        // Wait for the sidebar transition to finish (300ms in this example)
        const timeout = setTimeout(resizeCalendar, 300);

        // Cleanup timeout
        return () => clearTimeout(timeout);
    }, [isSidebarOpen]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleOpenMenuDropdown = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    // Delete event
    const handleEventClick = (event) => {
        setEventInfo(event)
        setIsDeleteEventOpen(true)
    }

    const handleEvents = (events) => {
        setEvents(events)
    }

    // Fill the input modal event
    const handleGetDetailEvent = (event) => {
        setDetailEvent(event)
    }

    // Add calender event
    const handleAddEventModal = (event = null) => {
        const tempEvent = event
            ? 
            event
            : 
            { 
                allDay: true,
                startStr: eventDate, 
                endStr: eventDate,
                view: {
                    calendar: calendarRef.current?.getApi() // Ensure we get the FullCalendar API if available
                }
            };

        setEventInfo(tempEvent)
        setIsAddEventOpen(true)
    }

    // Close the add event modal
    const handleCloseAddEventModal = () => {
        setIsAddEventOpen(false)
    }

    // Close the delete event modal
    const handleCloseDeleteEventModal = () => {
        setIsDeleteEventOpen(false)
    }

    // Get the date (yyyy-mm-dd) value from the calender on the sidebar
    const handleChangeCalender = (e) => {
        const value = `${e.year}-${String(e.month).padStart(2, '0')}-${String(e.day).padStart(2, '0')}`

        setEventDate(value)
    }

    return (
        <>
            {/* Modal calender for adding the event */}
            <ModalAddEvent
                isOpen={isAddEventOpen}
                onClose={handleCloseAddEventModal}
                eventDate={eventDate}
                eventInfo={eventInfo}
            />

            {/* Modal calender for deleting the event */}
            <ModalDeleteEvent
                isOpen={isDeleteEventOpen}
                onClose={handleCloseDeleteEventModal}
                eventInfo={eventInfo}
            />

            {/* Dropdown Menu */}
            <DropdownMenu isMenuOpen={isMenuOpen} />

            <div className="h-screen flex flex-col">
                {/* Top Navbar */}
                <nav className="w-full px-5 py-4 flex justify-between items-center">
                    <div className="flex justify-center items-center gap-5">
                        <button
                            onClick={toggleSidebar}
                            className="rounded focus:outline-none text-lg"
                        >
                            {isSidebarOpen ? "☰" : "☷"}
                        </button>
                        <h1 className="text-xl font-semibold">Calendar App</h1>
                    </div>

                    <div className="flex justify-center items-center gap-10">
                        <span className="cursor-pointer" onClick={handleOpenMenuDropdown}>
                            <Grid />
                        </span>
                    </div>
                </nav>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div
                        className={`transition-all duration-300 overflow-y-auto ${isSidebarOpen ? "w-72" : "w-0"}`}
                    >
                        <nav className="m-4 space-y-2">

                            <p className="text-center">Please choose the date for the task or event</p>

                            <Calendar
                                defaultValue={parseDate(todayFormattedDate(newDate))}
                                onChange={handleChangeCalender}
                                aria-label="Date (Uncontrolled)"
                            />

                            <Button
                                onPress={() => handleAddEventModal()}
                                color="primary"
                                startContent={<PlusIcon />}
                                variant="bordered"
                                className="w-full"
                            >
                                Add Event/Task
                            </Button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col">
                        <main className="flex-1 overflow-y-auto">
                            <Card radius="lg" className="p-4">
                                <CardBody>
                                    <FullCalendar
                                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                        headerToolbar={{
                                            left: 'prev,next today',
                                            center: 'title',
                                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                        }}
                                        initialView="dayGridMonth"
                                        editable={true}
                                        selectable={true}
                                        selectMirror={true}
                                        dayMaxEvents={true}
                                        weekends={true}
                                        // events={events}
                                        eventContent={renderEventContent} // custom render function
                                        eventClick={handleEventClick}
                                        // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                                        /* you can update a remote database when these fire:
                                        eventAdd={function(){}}
                                        eventChange={function(){}}
                                        eventRemove={function(){}}
                                        */
                                        select={handleAddEventModal}
                                        ref={calendarRef}
                                    />
                                </CardBody>
                            </Card>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

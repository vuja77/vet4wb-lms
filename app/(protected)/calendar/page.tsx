"use client"
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/sass/styles.scss';
export default function Page() {
const localizer = momentLocalizer(moment);

  const events = [
    {
      id: 0,
      title: "Board meeting",
      start: new Date(2018, 0, 29, 9, 0, 0),
      end: new Date(2018, 0, 29, 13, 0, 0),
      resourceId: 1
    },
    {
      id: 1,
      title: "MS training",
      allDay: true,
      start: new Date(2018, 0, 29, 14, 0, 0),
      end: new Date(2018, 0, 29, 16, 30, 0),
      resourceId: 2
    },
    {
      id: 2,
      title: "Team lead meeting",
      start: new Date(2018, 0, 29, 8, 30, 0),
      end: new Date(2018, 0, 29, 12, 30, 0),
      resourceId: 3
    },
    {
      id: 11,
      title: "Birthday Party",
      start: new Date(2018, 0, 30, 7, 0, 0),
      end: new Date(2018, 0, 30, 10, 30, 0),
      resourceId: 4
    }
  ];
  return (
    <main className=" min-h-[100vh] pt-[100px] p-12">
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </main>
  );
}

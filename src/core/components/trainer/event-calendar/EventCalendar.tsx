import React, { useState } from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import { useDispatch, useSelector } from 'react-redux';
import { setEventModalStatus, setFormDetail } from '../../../data/redux/shared/sharedSlice';
import EventDetail from './event-detail/EventDetail';
import clsx from 'clsx';

interface Event {
  title: string;
  date: string;
  extendedProps: any;
}

interface Props {
  events: Event[]
}
const EventCalendar = ({ events }: Props) => {
  const sharedActions: any = useSelector((state: any) => state.shared);
  const dispatch: any = useDispatch();

  const handleDateClick = (arg: any) => {
    console.log(arg)
    // alert(arg)
  }
  const handleEventClick = (arg: any) => {
    dispatch(setFormDetail(arg?.event?.extendedProps));
    dispatch(setEventModalStatus(true))
  }

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
      />
      {sharedActions.eventModal && <EventDetail />}
    </div>
  )
}
function renderEventContent(eventInfo: any) {
  return (
    <>
      <span className={clsx("cursor-pointer", 'ST_' + eventInfo.event?.extendedProps?.eventType)}>
        <strong className={clsx("text-capitalize")}>{eventInfo.event.title}</strong>
      </span>
    </>
  )
}
export default EventCalendar
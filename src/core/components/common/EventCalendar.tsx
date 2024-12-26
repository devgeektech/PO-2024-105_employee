
import React, { useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";
import moment from "moment";
import clsx from "clsx";

interface Props {
    events: any[]
}
export default function EventCalendar({ events }: Props) {
    const [date, setDate] = useState<Nullable<Date>>(null);
    const [bookedEvents, setBookedEvents] = useState<any[]>([]);

    useEffect(() => {
        const latestEvents: any[] = [];
        if (events.length) {
            events.forEach((ev) => {
                latestEvents.push({ date: ev?.date, eventType: ev?.eventType });
            })
            setBookedEvents(latestEvents)
        }
    }, [events.length])

    const dateTemplate = (date: any) => {
        const c = moment();
        c.date(date.day);
        c.month(date.month);
        c.year(date.year);
        const event= bookedEvents.find((ev)=>moment(ev?.date).format("DD-MM-YYYY")==c.format("DD-MM-YYYY"))
        if (event) {
            return (
                <strong className={clsx("fw-bold", "cal_"+event?.eventType)} title={event?.eventType}>{date.day}</strong>
            );
        }

        return date.day;
    }

    return (
        <Calendar  value={date} onChange={(e) => setDate(e.value)} readOnlyInput dateTemplate={dateTemplate} inline />
    )
}

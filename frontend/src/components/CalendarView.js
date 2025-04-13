import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchEvents } from '../redux/eventsSlice';
import EventModal from './EventModal';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  
  const { data: events } = useSelector(state => state.events);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [editEvent, setEditEvent] = useState(null);

  // Load events on mount
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot({
      start: slotInfo.start,
      end: slotInfo.end
    });
    setEditEvent(null);
    setModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setEditEvent(event);
    setSelectedSlot({ start: event.start, end: event.end });
    setModalOpen(true);
  };

  const handleEventDrop = async ({ event, start, end }) => {
    try {
      await axios.put(`http://localhost:5000/api/events/${event._id}`, {
        ...event,
        start,
        end,
      });
      dispatch(fetchEvents());
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleEventResize = async ({ event, start, end }) => {
    try {
      await axios.put(`http://localhost:5000/api/events/${event._id}`, {
        ...event,
        start,
        end,
      });
      dispatch(fetchEvents());
    } catch (error) {
      console.error('Error resizing event:', error);
    }
  };

  return (
    <div style={{ height: '80vh', padding: 20 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        resizable
        draggableAccessor={() => true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        defaultView="week"
        style={{ backgroundColor: '#f4f4f4' }}
      />
      {modalOpen && (
        <EventModal
          slotInfo={selectedSlot}
          closeModal={() => setModalOpen(false)}
          editEvent={editEvent}
        />
      )}
    </div>
  );
};

export default CalendarView;

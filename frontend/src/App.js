import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CalendarView from './components/CalendarView';
import { fetchEvents } from './redux/eventsSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>My Calendar</h1>
      <CalendarView />
    </div>
  );
};

export default App;
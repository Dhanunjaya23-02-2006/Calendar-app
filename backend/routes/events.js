const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error('GET error:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// POST create a new event
router.post('/', async (req, res) => {
  try {
    console.log('Creating event:', req.body);
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error('POST error:', err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// PUT update an event
router.put('/:id', async (req, res) => {
  try {
    console.log('Updating event:', req.body);
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error('PUT error:', err);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// DELETE an event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.sendStatus(204);
  } catch (err) {
    console.error('DELETE error:', err);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;

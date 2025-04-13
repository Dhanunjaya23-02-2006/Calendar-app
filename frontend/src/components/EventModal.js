import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchEvents } from "../redux/eventsSlice";

Modal.setAppElement("#root");

const EventModal = ({ slotInfo, closeModal, editEvent }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    category: "work",
    start: slotInfo?.start || new Date(),
    end: slotInfo?.end || new Date(),
    color: "#3f51b5",
  });

  useEffect(() => {
    if (editEvent) {
      setFormData({
        ...editEvent,
        start: new Date(editEvent.start),
        end: new Date(editEvent.end),
      });
    }
  }, [editEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editEvent) {
        await axios.put(
          `http://localhost:5000/api/events/${editEvent._id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/api/events", formData);
      }
      dispatch(fetchEvents());
      closeModal();
    } catch (error) {
      console.error("Failed to save event:", error);
    }
  };

  const handleDelete = async () => {
  try {
    await axios.delete(`http://localhost:5000/api/events/${editEvent._id}`);
    dispatch(fetchEvents());
  } catch (error) {
    console.error('Delete error:', error);
  } finally {
    closeModal(); // ensures modal closes even if fetch fails
  }
};


  return (
    <Modal isOpen onRequestClose={closeModal} contentLabel="Event Modal">
      <h2>{editEvent ? "Edit Event" : "Create Event"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="exercise">Exercise</option>
            <option value="eating">Eating</option>
            <option value="work">Work</option>
            <option value="relax">Relax</option>
            <option value="family">Family</option>
            <option value="social">Social</option>
          </select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <button type="submit">{editEvent ? "Update" : "Save"}</button>
          <button
            type="button"
            onClick={closeModal}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
          {editEvent && (
            <button
              type="button"
              onClick={handleDelete}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default EventModal;

import React, { useState } from "react";
import { createTask } from "../services/api";

function AddTaskForm({ clientId, refreshTasks }) {
  const [form, setForm] = useState({
    title: "",
    category: "Tax",
    due_date: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask({
        ...form,
        client_id: clientId,
        status: "Pending",
      });

      setForm({
        title: "",
        category: "Tax",
        due_date: "",
        priority: "Medium",
      });

      refreshTasks();
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "15px" }}>
      <h4>Add Task</h4>

      <input
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <select name="category" value={form.category} onChange={handleChange}>
        <option value="Tax">Tax</option>
        <option value="Filing">Filing</option>
        <option value="Compliance">Compliance</option>
      </select>

      <input
        type="date"
        name="due_date"
        value={form.due_date}
        onChange={handleChange}
        required
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default AddTaskForm;
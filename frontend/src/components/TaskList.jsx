import React, { useState } from "react";
import { updateTaskStatus } from "../services/api";

function TaskList({ tasks, filters, refreshTasks }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const today = new Date();

  let filteredTasks = tasks.filter((task) => {
    return (
      (filters.status === "" || task.status === filters.status) &&
      (filters.category === "" || task.category === filters.category) &&
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  //  Sorting
  if (sort === "due") {
    filteredTasks.sort(
      (a, b) => new Date(a.due_date) - new Date(b.due_date)
    );
  }

  //  Stats
  const total = tasks.length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const overdue = tasks.filter(
    t => t.status === "Pending" && new Date(t.due_date) < today
  ).length;

  const handleStatusChange = async (taskId, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
    await updateTaskStatus(taskId, newStatus);
    refreshTasks();
  };

  return (
    <div className="card">
      <h3>Tasks</h3>

      {/*  Controls */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="due">By Due Date</option>
        </select>
      </div>

      {/*  Stats */}
      <div style={{ marginBottom: "10px" }}>
        <strong>Total:</strong> {total} |{" "}
        <strong>Pending:</strong> {pending} |{" "}
        <strong>Completed:</strong> {completed} |{" "}
        <strong>Overdue:</strong> {overdue}
      </div>

      {filteredTasks.map((task) => {
        const isOverdue =
          task.status === "Pending" &&
          new Date(task.due_date) < today;

        return (
          <div
            key={task.id}
            className="card"
            style={{
              marginBottom: "10px",
              borderLeft: isOverdue ? "5px solid red" : "5px solid #4f46e5",
            }}
          >
            <strong>{task.title}</strong>
            <p>{task.category}</p>
            <p>Due: {task.due_date}</p>
            <p>Status: {task.status}</p>

            <button
              className="button button-primary"
              onClick={() =>
                handleStatusChange(task.id, task.status)
              }
            >
              Toggle Status
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;
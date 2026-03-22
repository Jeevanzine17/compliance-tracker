# 🚀 Mini Compliance Tracker

## 📌 Overview

This is a full-stack web application built to manage compliance tasks for multiple clients.

Users can:

* View clients
* Manage compliance tasks
* Track task status
* Identify overdue tasks

---

## ✨ Features

### Clients

* View list of clients
* Select a client to view tasks

### Tasks

* Add new tasks
* Update task status (Pending → Completed)
* Filter by status and category
* Search tasks
* Sort by due date
* Highlight overdue tasks

### Dashboard Enhancements

* Summary stats:

  * Total tasks
  * Pending tasks
  * Completed tasks
  * Overdue tasks

---

## 🛠 Tech Stack

* **Frontend:** React (Vite)
* **Backend:** FastAPI
* **Database:** SQLite
* **ORM:** SQLAlchemy

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/Jeevanzine17/compliance-tracker.git
cd compliance-tracker
```

---

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on:

[http://127.0.0.1:8000](http://127.0.0.1:8000)

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

[http://localhost:5173](http://localhost:5173)

---

## 🌐 Deployment

* **Frontend:** [Add your Vercel link here]
* **Backend:** [Add your Render link here]

---

## 📊 Data Model

### Client

* id
* company_name
* country
* entity_type

### Task

* id
* client_id
* title
* description
* category
* due_date
* status
* priority

---

## 🔒 Validation & Error Handling

* Input validation handled using **Pydantic**
* Constraints include:

  * Minimum title length
  * Allowed status values (Pending, Completed)
* Invalid inputs return structured error responses

---

## 📌 Assumptions

* Single user system (no authentication)
* Each task belongs to one client
* Focus on functionality over complex UI

---

## ⚖️ Tradeoffs

* Used SQLite for simplicity instead of PostgreSQL
* Minimal UI styling to prioritize core features
* No authentication to keep scope focused

---

## 🚀 Future Improvements

* Authentication system
* PostgreSQL database
* Notifications for overdue tasks
* Advanced filtering & sorting

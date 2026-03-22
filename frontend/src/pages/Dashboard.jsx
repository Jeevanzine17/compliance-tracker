import { useEffect, useState } from "react";
import { getClients, getTasks } from "../services/api";

import ClientList from "../components/ClientList";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";
import Filters from "../components/Filters";

function Dashboard() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [filters, setFilters] = useState({
    status: "",
    category: "",
  });

  // Load clients
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await getClients();
      setClients(res.data);
    } catch (err) {
      console.error("Error fetching clients", err);
    }
  };

  // Load tasks 
  useEffect(() => {
    if (selectedClient) {
      fetchTasks(selectedClient.id);
    }
  }, [selectedClient]);

  const fetchTasks = async (clientId) => {
    try {
      const res = await getTasks(clientId);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      
      {/* Clients */}
      <ClientList
        clients={clients}
        onSelect={setSelectedClient}
      />

      {/* Tasks Section */}
      <div style={{ flex: 1 }}>
        {selectedClient ? (
          <>
            <h2>{selectedClient.company_name}</h2>

            <Filters filters={filters} setFilters={setFilters} />

            <AddTaskForm
              clientId={selectedClient.id}
              refreshTasks={() => fetchTasks(selectedClient.id)}
            />

            <TaskList
              tasks={tasks}
              filters={filters}
              refreshTasks={() => fetchTasks(selectedClient.id)}
            />
          </>
        ) : (
          <p>Select a client to view tasks</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
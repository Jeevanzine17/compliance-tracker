import React, { useState } from "react";

function ClientList({ clients, onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="card" style={{ width: "250px" }}>
      <h3>Clients</h3>

      {clients.map((client) => (
        <div
          key={client.id}
          onClick={() => {
            setSelected(client.id);
            onSelect(client);
          }}
          style={{
            padding: "10px",
            marginBottom: "8px",
            borderRadius: "8px",
            background:
              selected === client.id ? "#e0e7ff" : "#fff",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          <strong>{client.company_name}</strong>
          <p style={{ fontSize: "12px" }}>
            {client.country} • {client.entity_type}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ClientList;
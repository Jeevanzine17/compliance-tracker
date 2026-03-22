import React from "react";

function Filters({ filters, setFilters }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <h4>Filters</h4>

      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
        style={{ marginRight: "10px" }}
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
      >
        <option value="">All Categories</option>
        <option value="Tax">Tax</option>
        <option value="Filing">Filing</option>
        <option value="Compliance">Compliance</option>
      </select>
    </div>
  );
}

export default Filters;
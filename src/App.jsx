import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import "./styles.css";

function App() {
  const [activeSection, setActiveSection] = useState("Users");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Aravind Reddy",
      email: "aravind@abc.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Vamsi",
      email: "vamsi@jkl.com",
      role: "Editor",
      status: "Active",
    },
    {
      id: 3,
      name: "Shiva",
      email: "shiva@xyz.in",
      role: "Viewer",
      status: "Inactive",
    },
  ]);

  const [roles, setRoles] = useState([
    { id: 1, name: "Admin" },
    { id: 2, name: "Editor" },
    { id: 3, name: "Viewer" },
  ]);

  return (
    <div className="app-container">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="content">
        {activeSection === "Users" ? (
          <UserManagement users={users} setUsers={setUsers} roles={roles} />
        ) : (
          <RoleManagement roles={roles} setRoles={setRoles} />
        )}
      </div>
    </div>
  );
}

export default App;

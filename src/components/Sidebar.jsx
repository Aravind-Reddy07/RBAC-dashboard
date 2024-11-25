import React from "react";
import { FiUsers, FiShield } from "react-icons/fi";

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="sidebar">
      <h2>RBAC Dashboard</h2>
      <div
        className={`menu-item ${activeSection === "Users" ? "active" : ""}`}
        onClick={() => setActiveSection("Users")}
      >
        <FiUsers />
        Users
      </div>
      <div
        className={`menu-item ${activeSection === "Roles" ? "active" : ""}`}
        onClick={() => setActiveSection("Roles")}
      >
        <FiShield />
        Roles
      </div>
    </div>
  );
};

export default Sidebar;

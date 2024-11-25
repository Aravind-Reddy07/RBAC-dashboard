import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

const RoleManagement = ({ roles, setRoles }) => {
  const [newRole, setNewRole] = useState("");
  const [editRoleId, setEditRoleId] = useState(null);
  const [editRoleName, setEditRoleName] = useState("");

  const addRole = () => {
    if (newRole.trim() === "") return;
    setRoles([...roles, { id: Date.now(), name: newRole }]);
    setNewRole("");
  };

  const editRole = (id, name) => {
    setEditRoleId(id);
    setEditRoleName(name);
  };

  const saveEditRole = () => {
    setRoles(
      roles.map((role) =>
        role.id === editRoleId ? { ...role, name: editRoleName } : role
      )
    );
    setEditRoleId(null);
    setEditRoleName("");
  };

  const deleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div className="management-section">
      <h2>Role Management</h2>
      <div className="add-role-container">
        <input
          type="text"
          class="role-input"
          placeholder="Add a new role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button onClick={addRole} className="add-button">
          + Add Role
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>
                {editRoleId === role.id ? (
                  <input
                    type="text"
                    value={editRoleName}
                    onChange={(e) => setEditRoleName(e.target.value)}
                  />
                ) : (
                  role.name
                )}
              </td>
              <td>
                {editRoleId === role.id ? (
                  <>
                    <button
                      className="action-button save"
                      onClick={saveEditRole}
                    >
                      Save
                    </button>
                    <button
                      className="action-button cancel"
                      onClick={() => setEditRoleId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="action-button edit"
                      onClick={() => editRole(role.id, role.name)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => deleteRole(role.id)}
                    >
                      <FiTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;

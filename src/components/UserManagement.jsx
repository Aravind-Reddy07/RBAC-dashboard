import React, { useState } from "react";
import Modal from "react-modal";
import { FiEdit, FiTrash } from "react-icons/fi";

Modal.setAppElement("#root");

const UserManagement = ({ users, setUsers, roles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });
  const [editUserId, setEditUserId] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const addUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) return;
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setNewUser({ name: "", email: "", role: "", status: "Active" });
    setIsModalOpen(false);
  };

  const startEditingUser = (user) => {
    setEditUserId(user.id);
    setEditUser({ ...user });
  };

  const saveEditedUser = () => {
    setUsers(users.map((user) => (user.id === editUserId ? editUser : user)));
    setEditUserId(null);
    setEditUser(null);
  };

  const cancelEditingUser = () => {
    setEditUserId(null);
    setEditUser(null);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="management-section">
      <h2>User Management</h2>
      <button className="add-button" onClick={() => setIsModalOpen(true)}>
        + Add User
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {editUserId === user.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editUser.name}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editUser.email}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <select
                      name="role"
                      value={editUser.role}
                      onChange={handleEditChange}
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      name="status"
                      value={editUser.status}
                      onChange={handleEditChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="action-button save"
                      onClick={saveEditedUser}
                    >
                      Save
                    </button>
                    <button
                      className="action-button cancel"
                      onClick={cancelEditingUser}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td
                    className={
                      user.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {user.status}
                  </td>
                  <td>
                    <button
                      className="action-button edit"
                      onClick={() => startEditingUser(user)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => deleteUser(user.id)}
                    >
                      <FiTrash />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add User Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Add User</h2>
        <form>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="Enter user name"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Enter email"
          />

          <label>Role</label>
          <select name="role" value={newUser.role} onChange={handleInputChange}>
            <option value="" disabled>
              Select role
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>

          <label>Status</label>
          <select
            name="status"
            value={newUser.status}
            onChange={handleInputChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="modal-actions">
            <button type="button" onClick={addUser} className="add-button">
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;

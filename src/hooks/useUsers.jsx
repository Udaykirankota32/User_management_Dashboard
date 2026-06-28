import { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userService";
import { mapApiUserToLocal, generateTempId } from "../utils/helpers";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUsers();
      const mapped = response.data.map(mapApiUserToLocal);
      setUsers(mapped);
    } catch (err) {
      setError("Failed to load users. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const addUser = async (formData) => {
    try {
      const response = await createUser(formData);
      const newUser = {
        ...formData,
        id: generateTempId(),
      };
      setUsers((prev) => [newUser, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, message: "Failed to add user. Please try again." };
    }
  };

  const editUser = async (id, formData) => {
    try {
      await updateUser(id, formData);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...formData, id } : user))
      );
      return { success: true };
    } catch (err) {
      return { success: false, message: "Failed to update user. Please try again." };
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, message: "Failed to delete user. Please try again." };
    }
  };

  return {
    users,
    loading,
    error,
    addUser,
    editUser,
    removeUser,
  };
};

export default useUsers;
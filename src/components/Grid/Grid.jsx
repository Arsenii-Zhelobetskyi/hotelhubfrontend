import React, { useState, useEffect } from "react";
import { AJAX } from "../../utils/api";
import { API_URL } from "../../utils/config";
function Grid() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend when the component mounts
    async function fetchUsers() {
      const data = await AJAX(`${API_URL}/api/users`); // Adjust the URL as needed
      setUsers(data);
    }
    fetchUsers();
  }, []);
  console.log(users);
  return (
    <div>
      <h1>users in bd: </h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.password}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Grid;

const API_URL = "http://localhost:5000/api/v1/users"; //

// Get users with pagination
export const getUsers = async (page = 1, limit = 5) => {
  const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

// Search users
export const searchUsers = async (term = "", page = 1, limit = 5) => {
  const res = await fetch(
    `${API_URL}/search?term=${encodeURIComponent(term)}&page=${page}&limit=${limit}`,
  );
  if (!res.ok) throw new Error("Failed to search users");
  return res.json();
};

// Get status
export const getStatus = async () => {
  const res = await fetch(`${API_URL}/status`);
  if (!res.ok) throw new Error("Failed to get status");
  return res.json();
};

// Add new user
export const addUser = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add user");
  return res.json();
};

// Update existing user
export const updateUser = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
};

// Delete user
export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
};

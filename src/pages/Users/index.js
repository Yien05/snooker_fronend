import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Header from "../../components/Header";
import { getUsers, updateUser, deleteUser } from "../../utils/api_auth"; 
import { Container, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedRole, setUpdatedRole] = useState("user");

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
    setUpdatedRole(user.role);
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(editingUser._id, updatedName, updatedEmail, updatedRole);
      toast.success("User updated successfully");

      // Refresh the user list
      const data = await getUsers();
      setUsers(data);
      setEditingUser(null);
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        toast.success("User deleted successfully");

        // Refresh the user list
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        toast.error("Error deleting user");
      }
    }
  };

  return (
    <Container>
      <Header />
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>
        <TableContainer component={Box} mb={4}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteUser(user._id)}
                      style={{ marginLeft: "8px" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {editingUser && (
          <Box mt={4} p={3} borderRadius="8px" boxShadow={3} bgcolor="#f9f9f9">
            <Typography variant="h5" gutterBottom>
              Edit User
            </Typography>
            <form onSubmit={(e) => e.preventDefault()}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                />
              </Box>
              <Box mb={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={updatedRole}
                    onChange={(e) => setUpdatedRole(e.target.value)}
                    label="Role"
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateUser}
                fullWidth
              >
                Update User
              </Button>
            </form>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Users;

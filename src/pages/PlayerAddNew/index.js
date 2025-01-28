import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, TextField, Button, Card, CardContent } from "@mui/material";
import Header from "../../components/Header";
import { toast } from "sonner";
import { addNewPlayer } from "../../utils/api_players";

function PlayerAddNew() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      toast.error("Please fill out all the required fields");
      return;
    }

    setLoading(true);  // Show loading state
    try {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage or cookies
      const newPlayerData = await addNewPlayer(name, token); 

      if (newPlayerData) {
        toast.success("Player has been added successfully");
        navigate("/"); // Redirect back to home page
      }
    } catch (error) {
      toast.error("Failed to add player");
    } finally {
      setLoading(false);  // Hide loading state once done
    }
  };

  return (
    <Container>
      <Header />
      <Card elevation={5}>
        <CardContent>
          <Typography variant="h4" align="center" mb={4}>
            Add New Player
          </Typography>
          <Box mb={2}>
            <TextField
              label="Name"
              required
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFormSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default PlayerAddNew;

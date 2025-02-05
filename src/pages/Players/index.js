
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { Button, Typography, Container, Box, Card, TextField } from "@mui/material";
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import Grid from "@mui/material/Grid2";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useCookies } from "react-cookie";
import { getPlayers } from "../../utils/api_players";
import { deletePlayer } from "../../utils/api_players";
import { isAdmin, getUserToken } from "../../utils/api_auth";
import { API_URL } from "../../constants"; 

function Players() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 


  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await getPlayers(searchTerm);  
      setPlayers(data);
    };

    fetchPlayers();
  }, [searchTerm]);  

  // Handle delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this player?");
    if (confirmed) {
      const deleted = await deletePlayer(id, token);
      if (deleted) {
        const latestPlayers = await getPlayers(searchTerm);  
        setPlayers(latestPlayers);
        toast.success("Player deleted successfully");
      } else {
        toast.error("Failed to delete Player");
      }
    }
  };

  return (
    <Container>
      <Header />
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>Players</Typography>
        {isAdmin(cookies) && (
          <Button LinkComponent={Link} to="/players/new" variant="contained" color="success">
            Add New
          </Button>
        )}
      </Box>


      <Box mt={2}>
        <TextField
          label="Search by name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </Box>

      <Grid container spacing={2} mt={2}>
        {players.length > 0 ? (
          players.map((player) => (
            <Grid key={player._id}  size={{
              xs: 6,
              md: 4,
              lg: 3,
            }}>
              <Card variant="outlined" sx={{ borderRadius: "8px", boxShadow: 3 }}>
                {player.image && (
                  <CardMedia component="img" image={`${API_URL}/${player.image}`} />
                )}
                <CardContent>
                  <Typography variant="h6">{player.name}</Typography>
                </CardContent>
                <CardActions sx={{ display: "block", padding: "16px" }}>
                  {isAdmin(cookies) && (
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                      <Button
                        variant="outlined"
                        LinkComponent={Link}
                        to={`/players/${player._id}/edit`}
                        color="primary"
                        size="small"
                        sx={{ textTransform: "none", marginRight: "8px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ textTransform: "none" }}
                        onClick={() => handleDelete(player._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid xs={12}>
            <Card>
              <CardContent>
                <Typography variant="body1" align="center">
                  No players found.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Players;

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Button,Link,Typography, Container } from "@mui/material";
import { getPlayers } from "../../utils/api_players";

function Players() {
  const [players, setPlayers] = useState([]);

  // get Players
  useEffect(() => {
    getPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  return (
    <Container>
      <Header />
      <Typography variant="h4" mb={4}>
        Players
      </Typography>
      <Button
            LinkComponent={Link}
            to="/newds/new"
            variant="contained"
            color="success"
          >
            Add New
          </Button>
      <Typography>
        {players && players.length > 0 ? (
          players.map((player) => (
            <Typography>{player.name}</Typography>
          ))
        ) : (
          <Typography>No players available</Typography>
        )}
      </Typography>
    </Container>
  );
  
}

export default Players;

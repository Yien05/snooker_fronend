import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
  Button,
  Typography,
  Container,
  Box,
  Card,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getMatches, deleteMatche } from "../../utils/api_matches";
import { isAdmin, getUserToken } from "../../utils/api_auth";
import { API_URL } from "../../constants";

function Matches() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatches();
        setMatches(data);
      } catch (error) {
        toast.error("Failed to fetch Matches");
      }
    };

    fetchMatches();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Matche?"
    );
    if (confirmed) {
      const deleted = await deleteMatche(id, token);
      if (deleted) {
        const latestMatches = await getMatches();
        setMatches(latestMatches);
        toast.success("Matche deleted successfully");
      } else {
        toast.error("Failed to delete Matche");
      }
    }
  };

  return (
    <Container>
      <Header />

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={4}
      >
        <Typography variant="h4" fontWeight={600} >
          Matches
        </Typography>
        {isAdmin(cookies) && (
          <Button
            LinkComponent={Link}
            to="/matches/new"
            variant="contained"
            color="success"
          >
            Add New Match
          </Button>
        )}
      </Box>

      <Grid container spacing={3} mt={3}>
        {matches.length > 0 ? (
          matches.map((matche) => (
            <Grid key={matche._id} item xs={12} sm={6} md={3} lg={3}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: "12px",
                  boxShadow: 3,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >

                <CardMedia
                  component="img"
                  image={`${API_URL}/${matche.image1}`}
                  alt="Match Image 1"
                  sx={{
                    objectFit: "contain",
                    height: "180px", 
                    width: "100%",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                />

                {matche.image2 && (
                  <CardMedia
                    component="img"
                    image={`${API_URL}/${matche.image2}`}
                    alt="Match Image 2"
                    sx={{
                      objectFit: "contain",
                      height: "180px", 
                      width: "100%",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  />
                )}

                <CardContent sx={{ paddingBottom: 3, paddingTop: 2 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {matche.name1} vs {matche.name2}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {matche.date} at {matche.time}
                  </Typography>
                </CardContent>

                <Divider />

                <CardActions sx={{ padding: "8px 16px" }}>
                  {isAdmin(cookies) && (
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      width="100%"
                    >
                      <Button
                        variant="outlined"
                        LinkComponent={Link}
                        to={`/matches/${matche._id}/edit`}
                        color="primary"
                        size="small"
                        sx={{ textTransform: "none" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(matche._id)}
                        sx={{ textTransform: "none" }}
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
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="body1" align="center">
                  No Matches found.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Matches;

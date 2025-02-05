import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
  Button,
  Typography,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { useCookies } from "react-cookie";
import { getNewds } from "../../utils/api_news";
import { deleteNewd } from "../../utils/api_news";
import { isAdmin, getUserToken } from "../../utils/api_auth";
import { API_URL } from "../../constants";

function Newds() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [newds, setNewds] = useState([]);
  const [originalNewds, setOriginalNewds] = useState([]);
  const [sortNewd, setSortNewd] = useState("");

  // Check if the user is logged in
  const isLoggedIn = !!cookies.currentUser;

  useEffect(() => {
    const fetchNewds = async () => {
      try {
        const data = await getNewds();
        setNewds(data);
        setOriginalNewds(data);
      } catch (error) {
        toast.error("Failed to fetch news");
      }
    };

    fetchNewds();
  }, []);

  const handleSortChange = async (event) => {
    const newSortNewd = event.target.value;
    setSortNewd(newSortNewd);

    if (newSortNewd === "") {
      // Reset to the original order when "None" is selected
      setNewds(originalNewds);
    } else {
      let sortBy = "name";
      let sortOrder = "";

      if (newSortNewd === "asc") {
        sortOrder = "asc";
      } else if (newSortNewd === "desc") {
        sortOrder = "desc";
      }

      try {
        const sortedNews = await getNewds(sortBy, sortOrder);
        setNewds(sortedNews);
      } catch (error) {
        toast.error("Failed to fetch sorted news");
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this New?"
    );
    if (confirmed) {
      const deleted = await deleteNewd(id, token);
      if (deleted) {
        const latestNewds = await getNewds();
        setNewds(latestNewds);
        toast.success("New deleted successfully");
      } else {
        toast.error("Failed to delete New");
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Header />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
          News
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          {isLoggedIn && (
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="sort-label">Filter News</InputLabel>
              <Select
                labelId="sort-label"
                value={sortNewd}
                onChange={handleSortChange}
                label="Filter News"
                sx={{ width: 150 }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="asc">A-Z</MenuItem>
                <MenuItem value="desc">Z-A</MenuItem>
              </Select>
            </FormControl>
          )}

          {isAdmin(cookies) && (
            <Button
              LinkComponent={Link}
              to="/newds/new"
              variant="contained"
              color="success"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                padding: "8px 20px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Add New
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={4} mt={4}>
        {newds.length > 0 ? (
          newds.map((newd) => (
            <Grid
              key={newd._id}
              size={{
                xs: 12,
                md: 6,
                lg: 4,
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  borderRadius: "12px",
                  boxShadow: 3,
                  overflow: "hidden",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                  minHeight: "380px", // Allow it to grow but set a base minimum height
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#fafafa",
                  width: "100%",
                }}
              >
                {newd.image && (
                  <Link
                    to={`/newds/${newd._id}`}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      display: "block",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`${API_URL}/${newd.image}`}
                      alt={newd.name}
                      sx={{
                        height: 200, // Fixed height for the image
                        width: "100%", // Cover full width
                        objectFit: "cover", // Maintain aspect ratio
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    />
                  </Link>
                )}

                <CardContent
                  sx={{ flexGrow: 1, minHeight: 120, padding: "16px" }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {newd.name}
                  </Typography>
                </CardContent>

                {isAdmin(cookies) && (
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Button
                        variant="outlined"
                        LinkComponent={Link}
                        to={`/newds/${newd._id}/edit`}
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
                        sx={{ textTransform: "none" }}
                        onClick={() => handleDelete(newd._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Card sx={{ padding: 2 }}>
              <CardContent>
                <Typography
                  variant="body1"
                  align="center"
                  color="textSecondary"
                >
                  No News found.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Newds;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Card, CardMedia, CardContent, Button } from "@mui/material";
import { getNewd } from "../../utils/api_news"; 
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { API_URL } from "../../constants";


function NewdDetail() {
  const { id } = useParams();
  const [newd, setNewd] = useState(null);

  useEffect(() => {
    const fetchNewd = async () => {
      try {
        const data = await getNewd(id);
        setNewd(data);
      } catch (error) {
        toast.error("Failed to fetch news details.");
      }
    };

    fetchNewd();
  }, [id]);

  if (!newd) return <Typography variant="h6">Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Card sx={{ maxWidth: "800px", width: "100%" }}>
          {newd.image && (
            <CardMedia
              component="img"
              image={`${API_URL}/${newd.image}`}
              alt={newd.name}
              sx={{ height: 400, objectFit: "cover" }}
            />
          )}
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
              {newd.name}
            </Typography>
            <Typography variant="body1" sx={{ color: "#555", mt: 2 }}>
              {newd.description}
            </Typography>

        
                  <Typography variant="h6">
                    {newd.detial}
                  </Typography>
        
          </CardContent>
          <Box sx={{ padding: "16px" }}>
            <Button
              LinkComponent={Link}
              to="/news"
              variant="outlined"
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Back to News
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

export default NewdDetail;

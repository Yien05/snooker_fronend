import { Container, Typography, TextField, Box, Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../../components/Header";
import { toast } from "sonner";
import { editNewd, getNewd } from "../../utils/api_news";
import { getUserToken,isAdmin } from "../../utils/api_auth";
import { useCookies } from "react-cookie";
import ButtonUpload from "../../components/ButtonUpload";
import { uploadImage } from "../../utils/api_image";
import { API_URL } from "../../constants";

function NewdEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [detial, setDetial] = useState("");
  const [image, setImage] = useState("");

    // check if is admin or not
    useEffect(() => {
      if (!isAdmin(cookies)) {
        navigate("/login");
      }
    }, [cookies, navigate]);

  useEffect(() => {
    getNewd(id).then((newdData) => {
      setLoading(false);
      setName(newdData.name);
      setDetial(newdData.detial);
      setImage(newdData.image);
    });
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name || !detial || !image) {
      toast.error("Please fill out all the required fields");
    } else {
      // trigger the API
      const updatedNewd = await editNewd(id, name, detial, image, token);

      if (updatedNewd) {
        toast.success("New has been edited successfully!");
        navigate("/news");
      }
    }
  };

  const handleImageUpload = async (files) => {
    // trigger the upload API
    const { image_url = "" } = await uploadImage(files[0]);
    // to set the uploaded image
    setImage(image_url);
  };

  return (
    <>
      <Container>
        <Header />
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" mb={4}>
              Edit NEW
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

            <Box mb={2}>
              <TextField
                label="Detial"
                required
                fullWidth
                value={detial}
                onChange={(event) => setDetial(event.target.value)}
              />
            </Box>

            <Box mb={2}>
              {image !== "" ? (
                <>
                  <div>
                    <img
                      src={`${API_URL}/${image}`}
                      style={{
                        width: "300px",
                        maxWidth: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <button onClick={() => setImage("")}>Remove</button>
                </>
              ) : (
                <ButtonUpload
                  onFileUpload={(files) => {
                    // handleImageUpload
                    if (files && files[0]) {
                      handleImageUpload(files);
                    }
                  }}
                />
              )}
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleFormSubmit}
            >
              Update
            </Button>
          </CardContent>
        </Card>
      </Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" ml={2}>
          Loading...
        </Typography>
      </Backdrop>
    </>
  );
}

export default NewdEdit;

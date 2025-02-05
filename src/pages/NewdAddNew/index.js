import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import Header from "../../components/Header";
import { toast } from "sonner";
import { addNewNewd } from "../../utils/api_news";
import { getUserToken, isAdmin } from "../../utils/api_auth";
import { useCookies } from "react-cookie";
import ButtonUpload from "../../components/ButtonUpload";
import { uploadImage } from "../../utils/api_image";
import { API_URL } from "../../constants";

function NewdAddNew() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [name, setName] = useState("");
  const [detial, setDetial] = useState("");
  const [image, setImage] = useState("");

  // check if is admin or not
  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!name || !detial|| !image) {
      toast.error("Please fill out all the required fields");
      return;
    }

    const newNewdData = await addNewNewd(name, detial, image, token);

    if (newNewdData) {
      toast.success("New has been added successfully");

      navigate("/news");
    }
  };

  const handleImageUpload = async (files) => {
    // trigger the upload API
    const { image_url = "" } = await uploadImage(files[0]);
    // to set the uploaded image
    setImage(image_url);
  };

  return (
    <Container>
      <Header />
      <Card elevation={5}>
        <CardContent>
          <Typography variant="h4" align="center" mb={4}>
            Add New News
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
            Submit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default NewdAddNew;

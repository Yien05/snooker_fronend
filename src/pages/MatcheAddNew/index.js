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
import { addNewMatche } from "../../utils/api_matches";
import { getUserToken, isAdmin } from "../../utils/api_auth";
import { useCookies } from "react-cookie";
import ButtonUpload from "../../components/ButtonUpload";
import { uploadImage } from "../../utils/api_image";
import { API_URL } from "../../constants";

function MatcheAddNew() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");


  // check if is admin or not
  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!name1||!name2||!date||!time||!image1||!image2) {
      toast.error("Please fill out all the required fields");
      return;
    }

    // trigger the add new Newd API
    const newNewdData = await addNewMatche(name1,name2,date,time, image1,image2, token);

    // check if the newNewdData exists or not
    if (newNewdData) {
      // show success message
      toast.success("New has been added successfully");
      // redirect back to home page
      navigate("/matches");
    }
  };

  const handleImageUpload1 = async (files) => {
    // trigger the upload API
    const { image_url = "" } = await uploadImage(files[0]);
    // to set the uploaded image
    setImage1(image_url);
  };

  const handleImageUpload2 = async (files) => {
    // trigger the upload API
    const { image_url = "" } = await uploadImage(files[0]);
    // to set the uploaded image
    setImage2(image_url);
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
              label="Name1"
              required
              fullWidth
              value={name1}
              onChange={(event) => setName1(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Name2"
              required
              fullWidth
              value={name2}
              onChange={(event) => setName2(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Date"
              required
              fullWidth
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Time"
              required
              fullWidth
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            {image1 !== "" ? (
              <>
                <div>
                  <p><b>Player 1</b></p>
                  <img
                    src={`${API_URL}/${image1}`}
                    style={{
                      width: "300px",
                      maxWidth: "300px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <button onClick={() => setImage1("")}>Remove</button>
              </>
            ) : (
              <ButtonUpload
                onFileUpload={(files) => {
                  // handleImageUpload
                  if (files && files[0]) {
                    handleImageUpload1(files);
                  }
                }}
              />
            )}
          </Box>

          <Box mb={2}>
            {image2 !== "" ? (
              <>
                <div>
                  <p><b>Player 2</b></p>
                  <img
                    src={`${API_URL}/${image2}`}
                    style={{
                      width: "300px",
                      maxWidth: "300px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <button onClick={() => setImage2("")}>Remove</button>
              </>
            ) : (
              <ButtonUpload
                onFileUpload={(files) => {
                  // handleImageUpload
                  if (files && files[0]) {
                    handleImageUpload2(files);
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

export default MatcheAddNew;

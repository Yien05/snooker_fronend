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
import { editMatche, getMatche } from "../../utils/api_matches";
import { getUserToken ,isAdmin} from "../../utils/api_auth";
import { useCookies } from "react-cookie";
import ButtonUpload from "../../components/ButtonUpload";
import { uploadImage } from "../../utils/api_image";
import { API_URL } from "../../constants";

function MatcheEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    getMatche(id).then((matcheData) => {
      setLoading(false);
      setName1(matcheData.name1);
      setName2(matcheData.name2);
      setDate(matcheData.date);
      setTime(matcheData.time);
      setImage1(matcheData.image1);
      setImage2(matcheData.image2);
    });
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name1 || !name2 || !date || !time || !image1 || !image2) {
      toast.error("Please fill out all the required fields");
    } else {
      // trigger the API
      const updatedPlayer = await editMatche(
        id,
        name1,
        name2,
        date,
        time,
        image1,
        image2,
        token
      );

      if (updatedPlayer) {
        toast.success("Player has been edited successfully!");
        navigate("/matches");
      }
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
    <>
      <Container>
        <Header />
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" mb={4}>
              Edit Player
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

export default MatcheEdit;

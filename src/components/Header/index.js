import { Typography, Box, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { isUserLoggedIn } from "../../utils/api_auth";

function Header(props) {
  const { title = "Welcome To My Snooker Website" } = props;
  const [cookies, removeCookie] = useCookies(["currentUser"]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear the cookies
    removeCookie("currentUser");
    // redirect the user back to login page
    navigate("/login");
  };

  return (
    <Box
      sx={{
        padding: "40px 0 30px 0",
        marginBottom: "30px",
        borderBottom: "1px solid #000",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        sx={{
          fontSize: "36px",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      <Box display="flex">
        <Box display="flex" gap={2} sx={{ marginTop: 1 }}>
          <Button
            variant={
              location.pathname === "/matches" ? "contained" : "outlined"
            }
            color="primary"
            LinkComponent={Link}
            to="/matches"
            sx={{
              padding: "10px 20px",
            }}
          >
            Matches
          </Button>

          <Button
            variant={
              location.pathname === "/" ? "contained" : "outlined"
            }
            color="primary"
            LinkComponent={Link}
            to="/"
            sx={{
              padding: "10px 20px",
            }}
          >
            Players
          </Button>
          <Button
            variant={location.pathname === "/news" ? "contained" : "outlined"}
            color="primary"
            LinkComponent={Link}
            to="/news"
            sx={{
              padding: "10px 20px",
            }}
          >
            News
          </Button>
        </Box>

        <Box marginLeft={"auto"} gap={2} sx={{ marginTop: 1 }}>
          {isUserLoggedIn(cookies) ? (
            <Box display={"flex"} alignItems={"center"}>
              <Typography>Current User:{cookies.currentUser.name}</Typography>
              <Button
                color="primary"
                sx={{
                  padding: "10px 20px",
                }}
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <>
              <Button
                variant={
                  location.pathname === "/login" ? "contained" : "outlined"
                }
                color="primary"
                LinkComponent={Link}
                to="/login"
                sx={{
                  padding: "10px 20px",
                }}
              >
                Login
              </Button>
              <Button
                variant={
                  location.pathname === "/signup" ? "contained" : "outlined"
                }
                color="primary"
                LinkComponent={Link}
                to="/signup"
                sx={{
                  padding: "10px 20px",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Header;

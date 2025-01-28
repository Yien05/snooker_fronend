import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Button,Link,Typography, Container } from "@mui/material";
import { getNewds } from "../../utils/api_news";

function News() {
  const [news, setNews] = useState([]);

  // get News
  useEffect(() => {
    getNewds().then((data) => {
      setNews(data);
    });
  }, []);

  return (
    <Container>
      <Header />
      <Typography variant="h4" mb={4}>
        News
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
        {news && news.length > 0 ? (
          news.map((newd) => (
            <Typography>{newd.name}</Typography>
          ))
        ) : (
          <Typography>No news available</Typography>
        )}
      </Typography>
    </Container>
  );
  
}

export default News;

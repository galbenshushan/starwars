import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Home = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Welcome to the Star Wars App
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          In the <strong>Search</strong> page, you can search for entities by
          name or title.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          In the <strong>Categories</strong> pages, you can edit, remove, or
          create new entities for each category.
        </Typography>
        <Typography variant="body1">
          Explore, manage, and customize Star Wars entities easily!
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;

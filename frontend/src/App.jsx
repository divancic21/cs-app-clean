import { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "./ThemeContext";

function App() {
  const [skins, setSkins] = useState([]);
  const [search, setSearch] = useState("");

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    fetch("http://localhost:3001/api/skins")
      .then((res) => res.json())
      .then((data) => setSkins(data))
      .catch((err) => console.error("Greška pri dohvaćanju skinova:", err));
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 6,
        mb: 6,
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        padding: 4,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: theme.palette.primary.main, mb: 4 }}
      >
        Counter Strike 2 Skins
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <TextField
          label="Pretraži skinove..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ maxWidth: 400, width: "100%" }}
        />
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>

      {skins.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>
          Učitavanje skinova...
        </Typography>
      ) : (
        <Grid
          container
          spacing={4}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(6, 1fr)",
            },
          }}
        >
          {skins
            .filter((skin) =>
              skin.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((skin) => (
              <Grid key={skin.id} sx={{ gridColumn: "span 1" }}>
                <Card
                  component={Link}
                  to={`/skin/${skin.id}`}
                  elevation={6}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    color: "inherit",
                    borderRadius: 3,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 12,
                    },
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={skin.image}
                    alt={skin.name}
                    sx={{
                      width: "100%",
                      objectFit: "contain",
                      backgroundColor: "#f0f4f8",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600, color: theme.palette.primary.dark }}
                    >
                      {skin.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minHeight: 60 }}
                    >
                      {skin.description?.length > 100
                        ? skin.description.slice(0, 100) + "..."
                        : skin.description || "Nema opisa."}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </Container>
  );
}

export default App;

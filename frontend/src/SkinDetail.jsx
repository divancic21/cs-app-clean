import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Modal,
  Grid,
  Container,
  Paper,
  Stack,
  Avatar,
} from "@mui/material";
import { FiThumbsUp, FiThumbsDown, FiMaximize2 } from "react-icons/fi";

function SkinDetail() {
  const { id } = useParams();
  const [skin, setSkin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [open, setOpen] = useState(false);

  // Dohvaćanje skin podataka
  useEffect(() => {
    fetch(`http://localhost:3001/api/skins/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSkin(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Došlo je do greške prilikom učitavanja podataka.");
        setLoading(false);
      });
  }, [id]);

  // Učitavanje lajkova/dislajkova iz localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem(`likes-${id}`);
    const savedDislikes = localStorage.getItem(`dislikes-${id}`);
    if (savedLikes) setLikes(parseInt(savedLikes));
    if (savedDislikes) setDislikes(parseInt(savedDislikes));
  }, [id]);

  // Funkcije za upravljanje lajk/dislajk
  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes-${id}`, newLikes);
  };

  const handleDislike = () => {
    const newDislikes = dislikes + 1;
    setDislikes(newDislikes);
    localStorage.setItem(`dislikes-${id}`, newDislikes);
  };

  if (loading) return <Typography>Učitavanje...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!skin) return <Typography>Skin nije pronađen.</Typography>;

  return (
    <Container>
      <Box textAlign="center" mt={4}>
        <Typography variant="h3" gutterBottom>
          {skin.name}
        </Typography>

        <Box position="relative" mx="auto" maxWidth="md" mt={4}>
          <Paper elevation={6}>
            <Box
              onClick={() => setOpen(true)}
              sx={{
                cursor: "pointer",
                borderRadius: 2,
                overflow: "hidden",
                maxWidth: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={skin.image}
                alt={skin.name}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "400px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </Box>
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
              }}
            >
              <FiMaximize2 />
            </IconButton>
          </Paper>

          <Typography mt={2} variant="body1">
            {skin.description || "Nema opisa."}
          </Typography>
        </Box>

        <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
          <Button
            variant="outlined"
            color="success"
            startIcon={<FiThumbsUp />}
            onClick={handleLike}
          >
            Like ({likes})
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<FiThumbsDown />}
            onClick={handleDislike}
          >
            Dislike ({dislikes})
          </Button>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          component={Link}
          to="/"
        >
          Vrati se na popis skinova
        </Button>

        {/* Modal za fullscreen sliku */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <img
              src={skin.image}
              alt={skin.name}
              style={{
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}

export default SkinDetail;

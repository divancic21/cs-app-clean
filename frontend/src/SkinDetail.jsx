import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Modal,
  Container,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { FiThumbsUp, FiThumbsDown, FiMaximize2 } from "react-icons/fi";
import { useTheme } from "@mui/material/styles";

function SkinDetail() {
  const { id } = useParams();
  const theme = useTheme();

  const [skin, setSkin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/skins/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSkin(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Došlo je do greške prilikom učitavanja podataka.");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const savedLikes = localStorage.getItem(`likes-${id}`);
    const savedDislikes = localStorage.getItem(`dislikes-${id}`);
    const savedComments = localStorage.getItem(`comments-${id}`);

    if (savedLikes) setLikes(parseInt(savedLikes));
    if (savedDislikes) setDislikes(parseInt(savedDislikes));
    if (savedComments) setComments(JSON.parse(savedComments));
  }, [id]);

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

  const handleAddComment = () => {
    if (!comment.trim()) return;
    const newComments = [...comments, comment.trim()];
    setComments(newComments);
    setComment('');
    localStorage.setItem(`comments-${id}`, JSON.stringify(newComments));
  };

  if (loading) return <Typography>Učitavanje...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!skin) return <Typography>Skin nije pronađen.</Typography>;

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 6,
        mb: 6,
        bgcolor: theme.palette.background.default,
        borderRadius: 4,
        padding: 4,
      }}
    >
      <Box textAlign="center">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
        >
          {skin.name}
        </Typography>

        <Box position="relative" mt={4}>
          <Paper
            elevation={6}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: theme.palette.background.paper,
              padding: 2,
            }}
          >
            <Box
              onClick={() => setOpen(true)}
              sx={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f0f4f8",
                borderRadius: 2,
              }}
            >
              <img
                src={skin.image}
                alt={skin.name}
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
              />
            </Box>

            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              <FiMaximize2 />
            </IconButton>

            <Typography mt={3} variant="body1" color="text.secondary">
              {skin.description || "Nema opisa."}
            </Typography>
          </Paper>
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
          sx={{ mt: 4, borderRadius: 2 }}
          component={Link}
          to="/"
        >
          ← Vrati se na popis skinova
        </Button>

        {/* Komentari */}
        <Box mt={6} textAlign="left">
          <Typography variant="h5" gutterBottom>
            Komentari korisnika
          </Typography>

          {comments.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Još nema komentara.
            </Typography>
          ) : (
            <Box sx={{ mb: 2 }}>
              {comments.map((c, i) => (
                <Paper
                  key={i}
                  elevation={2}
                  sx={{ p: 2, mb: 1, backgroundColor: theme.palette.background.paper }}
                >
                  {c}
                </Paper>
              ))}
            </Box>
          )}

          <TextField
            label="Dodaj komentar"
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
            disabled={!comment.trim()}
          >
            Pošalji
          </Button>
        </Box>

        {/* Modal za fullscreen sliku */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              bgcolor: "rgba(0, 0, 0, 0.85)",
              p: 4,
            }}
          >
            <img
              src={skin.image}
              alt={skin.name}
              style={{
                maxHeight: "90vh",
                maxWidth: "90vw",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}

export default SkinDetail;

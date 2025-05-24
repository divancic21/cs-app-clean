import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { Link } from 'react-router-dom';

function App() {
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/skins')
      .then((res) => res.json())
      .then((data) => setSkins(data))
      .catch((err) => console.error('Greška pri dohvaćanju skinova:', err));
  }, []);

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#1976d2' }}
      >
        Counter Strike 2 Skins
      </Typography>

      {skins.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>
          Učitavanje skinova...
        </Typography>
      ) : (
        <Grid
          container
          spacing={4}
          columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',   // 2 kolone na malim ekranima
              sm: 'repeat(4, 1fr)',   // 4 kolone na srednjim ekranima
              md: 'repeat(4, 1fr)',   // 4 kolone na većim ekranima
              lg: 'repeat(6, 1fr)',   // 6 kolona na velikim ekranima
            },
          }}
        >
          {skins.map((skin) => (
            <Grid
              key={skin.id}
              sx={{
                gridColumn: 'span 1', // svaki item zauzima jednu kolonu
              }}
            >
              <Card
                component={Link}
                to={`/skin/${skin.id}`}
                elevation={4}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  color: 'inherit',
                  borderRadius: 3,
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 8,
                  },
                  backgroundColor: '#f0f4ff',
                }}
              >
                <CardMedia
  component="img"
  height="180"
  image={skin.image}
  alt={skin.name}
  sx={{
    width: '100%',
    height: 180,
    objectFit: 'contain',    // Čitava slika se vidi, nije rastegnuta, a cijela je unutar visine 180px
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#f5f5f5', // opcionalno, da se vidi pozadina gdje je prazno oko slike
  }}
/>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: '600', color: '#0d47a1' }}
                  >
                    {skin.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ minHeight: 60 }}>
                    {skin.description.length > 100
                      ? skin.description.slice(0, 100) + '...'
                      : skin.description || 'Nema opisa.'}
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

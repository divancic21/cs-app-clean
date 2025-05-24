import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
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
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Lista Skinova
      </Typography>

      {skins.length === 0 ? (
        <Typography align="center">Učitavanje skinova...</Typography>
      ) : (
        <Grid container spacing={4} columns={12}>
          {skins.map((skin) => (
            <Grid
              key={skin.id}
              sx={{
                gridColumn: {
                  xs: 'span 12',
                  sm: 'span 6',
                  md: 'span 4',
                },
              }}
            >
              <Card
                component={Link}
                to={`/skin/${skin.id}`}
                sx={{
                  textDecoration: 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
                  },
                  borderRadius: 3,
                  color: 'inherit',
                }}
                elevation={3}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={skin.image}
                  alt={skin.name}
                  sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {skin.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {skin.description}
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

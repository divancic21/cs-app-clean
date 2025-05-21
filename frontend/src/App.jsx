import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/skins')
      .then((res) => res.json())
      .then((data) => setSkins(data))
      .catch((err) => console.error('Greška pri dohvaćanju skinova:', err));
  }, []);

  return (
    <div className="App">
      <h1>Lista Skinova</h1>

      {skins.length === 0 ? (
        <p>Učitavanje skinova...</p>
      ) : (
        <div className="skins-list">
          {skins.map((skin) => (
            <div key={skin.id} className="skin-card">
              <img src={skin.image} alt={skin.name} className="skin-image" />
              <h2>{skin.name}</h2>
              <p>{skin.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

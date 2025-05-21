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
        <ul>
          {skins.map((skin) => (
            <li key={skin.id}>{skin.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

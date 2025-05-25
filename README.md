
---
# CS2 Skins Application

Frontend je napravljen pomoću **React + Vite + MUI**, a backend koristi **Bun + Elysia** za serviranje skinova iz `skins.json`.

---

```
## Struktura projekta

cs-app-clean/
│
├── backend/
│   ├── server.js              # Elysia server – služi za izlaganje REST API-ja koji vraća podatke iz skins.json
│   └── skins.json             # JSON baza skinova – simulacija baze podataka s podacima o skinovima
│
├── frontend/
│   ├── public/
│   │   └── ikona.png          # favicon – ikonica prikazana u tabu preglednika
│   │
│   ├── src/
│   │   ├── App.jsx            # Glavna React komponenta – definira osnovnu strukturu UI-ja i koristi druge komponente
│   │   ├── main.jsx           # Ulazna točka aplikacije – ovdje se React aplikacija montira na `#root` u `index.html`
│   │   ├── SkinDetail.jsx     # Komponenta koja prikazuje detalje pojedinog skin-a (slika, ime, opis itd.)
│   │   └── ThemeContext.js    # React Context – omogućuje aplikaciji da dijeli podatke o temi (dark/light) između komponenti
│
│   ├── index.html             # HTML entry point – osnovna HTML stranica u koju se "ubacuje" React aplikacija
│   └── vite.config.js         # Vite konfiguracija – postavke build alata koji pokreće i bundla frontend
│
└── README.md                  # Dokumentacija s uputama za instalaciju i pokretanje aplikacije

```



---

## Tehnologije

### Backend
- [**Bun**](https://bun.sh) – ultrabrzi JS runtime
- [**Elysia**](https://elysiajs.com) – minimalistički backend framework
- `@elysiajs/cors` – CORS middleware

### Frontend
- [**Vite**](https://vitejs.dev) – moderan React build alat
- [**React**](https://reactjs.org)
- [**Material UI (MUI)**](https://mui.com)
- [**React Router DOM**](https://reactrouter.com)
- [**React Icons**](https://react-icons.github.io/react-icons)

---

## Instalacija Windows

## Kloniranje repozitorija

```bash
git clone https://github.com/divancic21/cs-app-clean.git
cd cs-app-clean
```

### Backend

```bash
cd backend
bun install
````

### Frontend

```bash
cd ../frontend
bun install
```

---

## Pokretanje aplikacije

### Pokretanje backenda

```bash
cd ../backend
bun run server.js
```

Backend se pokreće na: `http://localhost:3001`
Ruta: `GET /api/skins` vraća JSON iz `skins.json`

---

### Pokretanje frontenda

```bash
new terminal
cd cs-app-clean/frontend
bun run dev
```

Frontend se pokreće na: `http://localhost:5173`
`App.jsx` koristi `fetch("http://localhost:3001/api/skins")` da povuče skinove

---

## Instalacija MAC/Linux

## Instalacija BUN-a (ukoliko nije instaliran)

```bash
curl -fsSL https://bun.sh/install | bash
```

## Kloniranje repozitorija

```bash
git clone https://github.com/divancic21/cs-app-clean.git
cd cs-app-clean
```

### Backend

```bash
cd backend
bun install
````

### Frontend

```bash
cd ../frontend
bun install
```

---

## Pokretanje aplikacije

### Pokretanje backenda

```bash
cd ..
cd backend
bun run server.js
```

Backend se pokreće na: `http://localhost:3001`
Ruta: `GET /api/skins` vraća JSON iz `skins.json`

---

### Pokretanje frontenda

```bash
new terminal
cd cs-app-clean/frontend
bun run dev
```

Frontend se pokreće na: `http://localhost:5173`
`App.jsx` koristi `fetch("http://localhost:3001/api/skins")` da povuče skinove

---

## API Endpoint

```http
GET http://localhost:3001/api/skins
```

Servira podatke iz `backend/skins.json`

---



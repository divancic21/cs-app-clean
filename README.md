
---
# CS2 Skins Application

Frontend je napravljen pomoću **React + Vite + MUI**, a backend koristi **Bun + Elysia** za serviranje skinova iz `skins.json`.

---

```
## Struktura projekta

cs-app-clean/
│
├── backend/
│   ├── server.js              # Elysia server
│   └── skins.json             # JSON baza skinova
│
├── frontend/
│   ├── public/
│   │   └── ikona.png          # favicon
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── SkinDetail.jsx
│   │   └── ThemeContext.js
│   │
│   ├── index.html             # HTML entry point
│   └── vite.config.js         # Vite konfiguracija
│
└── README.md
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

## Instalacija

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
cd ..
cd frontend
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
cd cs-app-clean
cd frontend
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



import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "👋 Hello from Bun backend!")
  .get("/api/skins", () => {
    return [
      { id: 1, name: "Dragon Lore" },
      { id: 2, name: "Fade" },
    ];
  })
  .listen(3001);

console.log(`🟢 Backend running at http://${app.server?.hostname}:${app.server?.port}`);

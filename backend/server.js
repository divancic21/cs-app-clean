import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { readFileSync, writeFileSync } from "fs";

const SKINS_FILE = "./skins.json";

const loadSkins = () => {
  const data = readFileSync(SKINS_FILE, "utf-8");
  return JSON.parse(data);
};

const saveSkins = (skins) => {
  writeFileSync(SKINS_FILE, JSON.stringify(skins, null, 2));
};

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello from Bun backend!")
  .get("/api/skins", () => loadSkins())
  .get("/api/skins/:id", ({ params }) => {
    const skins = loadSkins();
    const skin = skins.find((s) => s.id == params.id); // koristi == zbog potencijalnog string/number ID-a
    if (!skin) {
      return { error: "Skin not found" };
    }
    return skin;
  })
  .post("/api/skins", ({ body }) => {
    const skins = loadSkins();
    skins.push(body);
    saveSkins(skins);
    return { success: true, added: body };
  })
  .listen(3001);

console.log(
  `🟢 Backend running at http://${app.server?.hostname}:${app.server?.port}`
);

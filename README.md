# Szakdolgozat — forráskód

Röviden: ez egy kis full‑stack táboroztatás/gyerekkezelő alkalmazás (Express + SQLite backend; Vue 3 + Vite frontend). A README tartalmazza a gyors telepítést, futtatást, architektúrát, fontos végpontokat és ismert problémákat.

---

## Teknológiai stack

- Backend: Node.js, Express, SQLite (fájl alapú `data.db`)
- Frontend: Vue 3, Vite, Vue Router, Vuex
- Auth / security: JWT, bcrypt (telepítve de használat függ a `userController` implementációjától)

---

## Gyors indítás (Windows / cross-platform)

1. Klónozd a repót és lépj a mappába:

   ```bash
   cd Szakdoga_V2_Git
   ```

2. Backend telepítése és futtatása:

   ```powershell
   cd backend
   npm install
   npm run dev    # fejlesztői mód (nodemon)
   # vagy: npm start (production)
   ```

   - A backend alapértelmezett portja a `.env`-ben található (`port`).

3. Frontend telepítése és futtatása:

   ```bash
   cd frontend/camp-manager
   npm install
   npm run dev    # Vite (alap: http://localhost:5173)
   ```

---

## Környezeti változók (.env) — javasolt `backend/.env.example`

> Helyezd a valós értékeket egy `backend/.env` fájlba (ne töltsd fel Git-be).

```env
PORT=3000
JWT_SECRET=valami_erős_secret
NODE_ENV=development
```

---

## Adatbázis

- Az alkalmazás SQLite-ot használ: `backend/dbConnection/data.db` (inicializálódik automatikusan a szerver indításakor a `dbCreateTables.js` által).
- Ha szeretnéd újrainicializálni a sémát: biztonsági mentés után töröld a `data.db` fájlt, majd indítsd újra a szervert.
- Seed / export: van `export.sql` a repo-ban — betölthető SQLite klienssel.

---

## Kiemelt API végpontok (választék)

Backend base: `http://localhost:<PORT>/api`

- Gyerekek (children)
  - `GET  /api/child` — összes gyerek
  - `POST /api/child` — új gyerek létrehozása
  - `GET  /api/child/:id` — gyerek lekérdezése
  - `PUT  /api/child/:id` — gyerek módosítása
  - `DELETE /api/child/:id` — törlés
  - `GET  /api/child/group/:groupId` — csoport gyerekei
  - `PUT  /api/child/group/:groupId/:childid` — hozzárendelés csoporthoz

Példa (curl):

```bash
curl -sS http://localhost:3000/api/child | jq '.'
curl -X POST http://localhost:3000/api/child -H "Content-Type: application/json" -d '{"name":"Tomi","dateOfbirth":"2016-01-01","parantName":"Édesanya","parantPhone":"0612345678","address":"Cím","schoolId":1}'
```

---

## Fontos fájlok — hol keress?

- `backend/server.js` — Express entrypoint, route regisztráció
- `backend/routes/*.js` — útvonalak (pl. `childRoutes.js`)
- `backend/controllers/*.js` — üzleti logika (pl. `childController.js`)
- `backend/dbConnection/dbCreateTables.js` — DB séma
- `frontend/camp-manager/src` — Vue app, router és komponensek

---

## Ismert problémák & biztonsági kockázatok

- SQL injection: több controller dinamikus string-interpolációt használ SQL lekérdezésekhez (példa: `... WHERE groupId = ${req.params.groupId}`). Ajánlott: prepared statements / placeholder használata és bemenet-ellenőrzés.
- Változó/elnevezési inkonzisztencia (pl. `parantName` vs `parentName`) — javasolt refaktor.
- Hibakezelés nem minden endpointnál következetes — érdemes egységes JSON error formátumot bevezetni.

---

## Javasolt első PR-ek (prioritás szerint)

1. SQL injection javítása a `childController`-ben (high).
2. Egységes error handler + HTTP státuszok finomítása.
3. `backend/.env.example` hozzáadása és README bővítése (ez a PR jó kezdés).
4. Egyszerű seed script és egy-két integrációs teszt a CRUD végpontokra.

---

## Fejlesztési tippek / debugging

- Logok: a backend konzolján megjelennek a DB inicializálási üzenetek.
- Ha a frontend nem talál végpontot, ellenőrizd, hogy a backend valóban a beállított `PORT`-on fut-e, és a CORS engedélyezve van (alapértelmezett: be van állítva).

---

## Hogyan segíthetek még?

- Készíthetek egy PR-t: SQL-injection javítás a `childController`-ben, vagy egy `backend/.env.example` fájlt és egy `seed` scriptet.  
  Mondd meg, melyik prioritású — és megcsinálom.

---

© Totya — projekt forráskód (2026).

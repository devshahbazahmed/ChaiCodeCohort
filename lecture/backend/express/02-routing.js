const express = require("express");

function block_1_httpMethods() {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.json());

    const routes = {
      1: {
        id: 1,
        name: "Lucknow Express",
        direction: "North",
      },
      2: {
        id: 2,
        name: "Gorakhpur Express",
        direction: "East",
      },
    };

    let nextId = 3;

    // list all trains
    app.get("/routes", (req, res) => {
      res.json(Object.values(routes));
    });

    // single route by ID:
    app.get("/routes/:id", (req, res) => {
      const route = routes[req.params.id];
      if (!route) {
        return res.status(404).json({
          error: "No train on this ID",
        });
      }

      return res.json(route);
    });

    // POST
    app.post("/routes", (req, res) => {
      // no validation, no zod
      const newRoute = {
        id: nextId++,
        ...req.body,
      };
      routes[newRoute.id] = newRoute;
      return res.status(201).json(newRoute);
    });

    // PUT
    app.put("/routes/:id", (req, res) => {
      const id = req.params.id;
      if (!routes[id]) return res.status(404).json({ error: "ID not found" });
      routes[id] = {
        id: Number(id),
        ...req.body,
      };
    });

    // PATCH
    app.patch("/routes/:id", (req, res) => {
      const id = req.params.id;
      const { newName, newDirection } = req.body;
      if (!routes[id]) return res.status(404).json({ error: "ID not found" });
      routes[id] = {
        id: Number(id),
        name: newName,
        direction: newDirection,
      };

      return res.status(200).json(routes[id]);
    });

    // DELETE
    app.delete("/routes/:id", (req, res) => {
      const id = req.params.id;
      const { newName, newDirection } = req.body;
      if (!routes[id]) return res.status(404).json({ error: "ID not found" });
      delete routes[id];
      return res.status(204).json({
        message: "Deleted Successfully",
      });
    });

    // Only for express5 and above
    app.get("/files/*filepath", (req, res) => {
      const filepath = req.params.filepath; // wild-card
      res.json({ filepath, type: "wildcard" });
    });

    app
      .route("/schedule")
      .get((req, res) => {})
      .post((req, res) => {})
      .put((req, res) => {})
      .delete((req, res) => {});

    app.use("/api", (req, res) => {
      // its a prefetch match
    });

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;

      try {
        // TODO:
        const listRes = await fetch(`${base}/routes`);
        const listData = await listRes.json();

        const createRes = await fetch(`${base}/routes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            body: JSON.stringify({
              name: "Delhi Express",
              direction: "North",
            }),
          },
        });
        const createdData = await createRes.json();
      } catch (error) {
        console.error(error);
      }

      server.close(() => {
        console.log("Block_1 served");
        resolve();
      });
    });
  });
}

async function main() {
  await block_1_httpMethods();

  process.exit(0);
}

main();

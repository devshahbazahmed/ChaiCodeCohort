const express = require("express");

function block_1_middlewares() {
  return new Promise((resolve) => {
    const app = express();
    const logs = [];

    app.use(express.json({ limit: "50kb" }));
    app.use(express.urlencoded({ extended: true, limit: "50kb" }));
    app.use(
      express.static(rootCertificates, {
        dotfiles: "ignore",
        maxAge: 0,
      })
    );

    // request logger
    app.use((req, res, next) => {
      // add to database
      // console everything
      // write in some file
      const logEntry = `${req.method} : ${req.url}`;
      logs.push(logEntry);
      console.log(` [LOG] -- ${logEntry} `);

      // if your request hangs forever
      next();
    });

    app.use((req, res, next) => {
      req.startTime = Date.now();

      res.on("finish", () => {
        const duration = Date.now() - req.startTime;
        console.log(
          ` [TIMER] - ${req.method} : ${req.url} - took ${duration} `
        );
      });

      next();
    });

    function authMe(req, res, next) {
      const token = req.headers["x-auth-token"];

      if (!token)
        return res.status(401).json({ error: "No token. Please log-in" });

      if (token !== "secret-chaicode") {
        return res.status(403).json({ error: "Invalid Token" });
      }

      // token -> extract data from token
      req.user = {
        id: 1,
        name: "hitesh",
        role: "admin",
      };

      next();
    }

    function getRole(role) {
      return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
          return res.status(404).json({ error: `Role ${role} required ` });
        }

        next();
      };
    }

    function rateLimitter(maxRequest) {
      let count = 0;

      return (req, res, next) => {
        count++;
        if (count > maxRequest) {
          return res
            .status(429)
            .json({ error: "Too many request, please try after some time" });
        }

        next();
      };
    }

    const limitedEndpoint = rateLimitter(3);

    app.get("/limited", limitedEndpoint, (req, res, next) => {});

    app.get("/profile", authMe, getRole("admin"), (req, res) => {});
    app.get("/profile", authMe, getRole("teacher"), (req, res) => {});
    app.get("/profile", authMe, getRole("student"), (req, res) => {});
    app.get(
      "/profile",
      authMe,
      getRole(["admin", "teacher", "student"]),
      (req, res) => {}
    );

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;
      try {
        // TODO:
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
  await block_1_middlewares();

  process.exit(0);
}

main();

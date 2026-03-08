const express = require("express");

const app = express();

app.use(express.json());

app.get("/menu", (req, res) =>
  res.json({
    items: ["thali", "biryani"],
  })
);

app.post("/order", (req, res) => {
  res.status(201).json({
    status: "recieved",
    order: req.body,
  });
});

app.listen(3000, () => console.log(`Server running on port 3000`));

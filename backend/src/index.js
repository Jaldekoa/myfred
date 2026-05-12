import { constructURL } from "./utils.js";
import express from "express";
import cors from "cors";

const { PORT } = process.env;

const corsOptions = {
  origin: ["https://dashboard.dineroybanca.com", `http://localhost:${PORT}`],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const headers = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/api/:series_id", async (req, res) => {
  try {
    const url = constructURL(req);
    const response = await fetch(url, { headers });
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

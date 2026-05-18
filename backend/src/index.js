import { constructURL } from "./utils.js";
import express from "express";
import cors from "cors";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const { FRONTEND_PORT, BACKEND_PORT } = process.env;

const corsOptions = {
  origin: [
    "https://dashboard.dineroybanca.com",
    `http://localhost:${FRONTEND_PORT}`,
  ],
  methods: ["GET"],
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
    console.log("Calling FRED:", url);

    const response = await fetch(url, headers);
    console.log("FRED status:", response.status, response.statusText);

    const text = await response.text();
    console.log("FRED raw response:", text.slice(0, 500));

    const data = JSON.parse(text);

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({
      error: error.message,
      code: error?.cause?.code || error?.code,
    });
  }
});

app.listen(BACKEND_PORT, () => {
  console.log(`Server is running on port ${BACKEND_PORT}`);
});

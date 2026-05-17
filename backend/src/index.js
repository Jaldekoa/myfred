import { constructURL } from "./utils.js";
import express from "express";
import cors from "cors";

const { FRONTEND_PORT, BACKEND_PORT } = process.env;

const allowedOrigins = new Set([
  "https://dashboard.dineroybanca.com",
  `http://localhost:${FRONTEND_PORT}`,
]);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    const isLocalDevOrigin = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(
      origin,
    );

    if (allowedOrigins.has(origin) || isLocalDevOrigin) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS.`));
  },
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
  const { series_id } = req.params;

  if (!series_id?.trim()) {
    return res.status(400).json({ error: "series_id is required." });
  }

  try {
    const url = constructURL(req);
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error_message || "FRED API request failed.",
      });
    }

    if (data.error_code || data.error_message) {
      return res.status(400).json({
        error: data.error_message || "FRED API returned an error.",
      });
    }

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: "Error calling to external API." });
  }
});

app.listen(BACKEND_PORT, () => {
  console.log(`Server is running on port ${BACKEND_PORT}`);
});

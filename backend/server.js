import path from "path";
import http from "http";
import https from "https";
import fs from "fs";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import manageRoutes from "./routes/manageRoutes.js";
import h55eventRoutes from "./routes/h55eventRoutes.js";
import gameRoutes from "./routes/mentors/gameRoutes.js";
import mentorRoutes from "./routes/mentors/mentorRoutes.js";

import cosplayRoutes from "./routes/cosplayRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import kolRoutes from "./routes/kolRoutes.js";
import quotesRoutes from "./routes/quotes/quotesRoutes.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/h55event", h55eventRoutes);
app.use("/api/manage", manageRoutes);
app.use("/api/mentors", gameRoutes, mentorRoutes);

app.use("/api/cosplay", cosplayRoutes);
app.use("/api/test", testRoutes);
app.use("/api/kol", kolRoutes);
app.use("/api/quotes", quotesRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/live")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "live", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

let server;
if (process.env.NODE_ENV !== "production") {
  server = http.createServer(app);
} else {
  const options = {
    key: fs.readFileSync(process.env.SSL_keyfile),
    cert: fs.readFileSync(process.env.SSL_certfile),
    ca: [fs.readFileSync(process.env.SSL_cafile)],
  };

  server = https.createServer(options, app);
}

server.listen(PORT, "0.0.0.0", function () {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

import express from "express";
import cors from "cors";
import moviesRoute from "./routes/movies.route.js";
import usersRoute from "./routes/users.route.js";
import reviewRoute from "./routes/review.route.js";

const app = express();
// Middleware para parsear JSON
app.use(cors({ origin: "*" }));
app.use(express.json());

// Usar la ruta de "movies"
app.use("/api/v1/movie", moviesRoute);
app.use("/api/v1/user", usersRoute);
app.use("/api/v1/review", reviewRoute);


export default app;

import express from "express";
import { deleteMovie, findMovieById, findAllMovies, createMovie, updateMovie } from "../controller/movie.controller.js";

const router = express.Router();

router.get("/", findAllMovies);
router.post("/", createMovie);
router.get("/:id", findMovieById);
router.delete("/:id", deleteMovie);
router.put("/:id", updateMovie);

export default router;

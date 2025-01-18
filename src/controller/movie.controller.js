import Movie from "../models/movies.model.js";

export const findAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error al obtener películas:", error);
    res.status(500).json({ message: "Error al obtener películas" });
  }
};

export const createMovie = async (req, res) => {
  try {
    const movies = req.body;
    console.log(movies);
    await Movie.create(movies);
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error al Crear película:", error);
    res.status(500).json({ message: "Error al Crear película " });
  }
};

export const findMovieById = async (req, res) => {
  try {
    const movieId = parseInt(req.params.id);
    if (isNaN(movieId)) {
      return res.status(400).json({ message: "ID de película inválido" });
    }
    const movie = await Movie.findOne({
      where: { id: movieId },
    });
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error al obtener películas:", error);
    res.status(500).json({ message: "Error al obtener películas" });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movieId = parseInt(req.params.id);
    if (isNaN(movieId)) {
      return res.status(400).json({ message: "ID de película inválido" });
    }
    const result = await Movie.destroy({
      where: { id: req.params.id }
    })
    if (result === 0) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.status(200).json({ message: "Película eliminada con éxito" });
  } catch (error) {
    console.error("Error al obtener películas:", error);
    res.status(500).json({ message: "Error al obtener películas" });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movieId = parseInt(req.params.id);
    if (isNaN(movieId)) {
      return res.status(400).json({ message: "ID de película inválido" });
    }
    const movie = req.body;
    const [updated] = await Movie.update(movie, {
      where: { id: movieId }
    });
    if (updated === 0) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.status(200).json({ message: "Película actualizada con éxito" });
  } catch (error) {
    console.error("Error al actualizar películas:", error);
    res.status(500).json({ message: "Error al actualizar películas" });
  }
}

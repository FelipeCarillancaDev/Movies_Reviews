import Reviews from "../models/reviews.model.js";

export const findAllReviews = async (req, res) => {
  try {
    const reviews = await Reviews.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error al obtener Reseña de peliculas:", error);
    res.status(500).json({ message: "Error al obtener Reseña de peliculas" });
  }
};

export const createReview = async (req, res) => {
  try {
    const review = await Reviews.create(req.body);
    res.status(200).json(review);

  } catch (error) {
    console.error("Error al obtener Reseña de peliculas:", error);
    res.status(500).json({ message: "Error al obtener Reseña de peliculas" });
  }
}

export const findReviewById = async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);
    if (isNaN(reviewId)) {
      return res.status(400).json({ message: "ID de Reseña inválido" });
    }
    const review = await Reviews.findOne({ where: { id: reviewId } });
    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error("Error al obtener Reseña de peliculas:", error);
    res.status(500).json({ message: "Error al obtener Reseña de peliculas" });
  }
}

export const deleteReview = async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);
    if (isNaN(reviewId)) {
      return res.status(400).json({ message: "ID de Reseña invático" });
    }
    const result = await Reviews.destroy({ where: { id: reviewId } });
    if (result === 0) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    res.status(200).json({ message: "Reseña eliminada con éxito" });
  } catch (error) {
    console.error("Error al obtener Reseña de peliculas:", error);
    res.status(500).json({ message: "Error al obtener Reseña de peliculas" });
  }
}

export const updateReview = async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);
    if (isNaN(reviewId)) {
      return res.status(400).json({ message: "ID de Reseña invático" });
    }
    const review = req.body;
    const [updated] = await Reviews.update(review, { where: { id: reviewId } });
    if (updated === 0) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    res.status(200).json({ message: "Reseña actualizada con éxito" });
  } catch (error) {
    console.error("Error al obtener Reseña de peliculas:", error);
    res.status(500).json({ message: "Error al obtener Reseña de peliculas" });
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: "Ya existe una reseña con ese usuario y pelicula" });
    }
  }
}



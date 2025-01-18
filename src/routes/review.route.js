import express from "express";
import {
  findAllReviews,
  createReview,
  findReviewById,
  deleteReview,
  updateReview
} from "../controller/review.controller.js";

const router = express.Router();

router.get("/", findAllReviews);
router.post("/", createReview);
router.get("/:id", findReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
export default router;
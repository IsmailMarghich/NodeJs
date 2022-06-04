import express from "express";
const router = express.Router();
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPLan,
} from "../controllers/tourController.js";

router.route("/monthly-plan/:year").get(getMonthlyPLan);
router.route("/tour-stats").get(getTourStats);
router.route("/top-5-tours").get(aliasTopTours, getAllTours);
router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
export default router;

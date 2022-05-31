import express from "express";
const router = express.Router();
import { checkBody, checkID } from "../controllers/tourController.js";

/*check whether id is valid whenever user provides an id*/
router.param("id", checkID);

import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} from "../controllers/tourController.js";

router.route("/").get(getAllTours).post(checkBody, createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default router;

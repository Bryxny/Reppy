const express = require("express");
const router = express.Router();

const {
  generateWorkoutPlan,
  swapExercise,
} = require("../controllers/workoutController");

router.post("/generate-plan", generateWorkoutPlan);

router.post("/swap-exercise", swapExercise);

module.exports = router;

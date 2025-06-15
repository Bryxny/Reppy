const express = require("express");
const router = express.Router();

const {
  generateWorkoutPlan,
  getAlternateExercises,
  swapExercise,
} = require("../controllers/workoutController");

router.post("/generate-plan", generateWorkoutPlan);
router.post("/get-alternatives", getAlternateExercises);
router.post("/swap-exercise", swapExercise);

module.exports = router;

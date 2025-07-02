const express = require("express");
const router = express.Router();

const {
  generateWorkoutPlan,
  getAlternateExercises,
  swapExercise,
  deleteExercise,
} = require("../controllers/workoutController");

router.post("/generate-plan", generateWorkoutPlan);
router.post("/get-alternatives", getAlternateExercises);
router.post("/swap-exercise", swapExercise);
router.post("/delete-exercise", deleteExercise);

module.exports = router;

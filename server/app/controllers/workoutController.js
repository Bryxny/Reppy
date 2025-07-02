const generateWorkout = require("../utils/generateWorkout");
const {
  alternateExercises,
  replaceExercise,
} = require("../utils/alternateExercises");

exports.generateWorkoutPlan = (req, res, next) => {
  const { days, equipment } = req.body;
  try {
    const plan = generateWorkout(days, equipment);
    // console.log("Plan JSON:\n", JSON.stringify(plan, null, 2));
    res.status(200).json(plan);
  } catch (err) {
    next(err);
  }
};

exports.getAlternateExercises = (req, res, next) => {
  const { exercise, equipment, excludedExercises } = req.body;

  try {
    const alternatives = alternateExercises({
      exercise,
      equipment,
      excludedExercises,
    });
    if (!alternatives || alternatives.length === 0) {
      return res
        .status(200)
        .json({ message: "No alternative exercises found", alternatives: [] });
    }
    res.status(200).json(alternatives);
  } catch (err) {
    next(err);
  }
};

exports.swapExercise = (req, res, next) => {
  const { plan, oldEx, newEx } = req.body;
  try {
    const newPlan = replaceExercise(plan, oldEx, newEx);
    res.status(200).json(newPlan);
  } catch (err) {
    next(err);
  }
};

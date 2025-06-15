const generateWorkout = require("../utils/generateWorkout");

exports.generateWorkoutPlan = async (req, res, next) => {
  const { days, equipment } = req.body;
  try {
    const plan = generateWorkout(days, equipment);
    res.status(200).json(plan);
  } catch (err) {
    next(err);
  }
};

exports.swapExercise = async (req, res, next) => {};

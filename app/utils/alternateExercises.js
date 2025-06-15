const { legExercises } = require("../data/legExercises");
const { pullExercises } = require("../data/pullExercises");
const { pushExercises } = require("../data/pushExercises");

function alternateExercises(exercise) {
  const allExercises = legExercises.concat(pullExercises, pushExercises);
  const alternatives = [];

  for (const ex of allExercises) {
    if (ex.name === exercise.name) continue;

    if (
      ex.type[0] === exercise.type[0] &&
      ex.movement === exercise.movement &&
      ex.isCompound === exercise.isCompound &&
      !alternatives.includes(ex)
    ) {
      alternatives.push(ex);
    } else if (
      ex.type[0] === exercise.type[0] &&
      ex.movement === exercise.movement &&
      !alternatives.includes(ex)
    ) {
      alternatives.push(ex);
    } else if (ex.type[0] === exercise.type[0] && !alternatives.includes(ex)) {
      alternatives.push(ex);
    }
    if (alternatives.length >= 5) break;
  }

  return alternatives;
}

function replaceExercise(plan, oldEx, newEx) {
  return plan.map((day) => ({
    ...day,
    exercises: day.exercises.map((exercise) =>
      exercise.name === oldEx.name ? newEx : exercise
    ),
  }));
}
module.exports = { alternateExercises, replaceExercise };

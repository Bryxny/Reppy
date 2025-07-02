function removeExercise(plan, exercise) {
  return plan.map((day) => ({
    ...day,
    exercises: day.exercises.filter((ex) => ex.name !== exercise.name),
  }));
}
module.exports = { removeExercise };

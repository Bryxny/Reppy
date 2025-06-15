const generateWorkout = require("../app/utils/generateWorkout");
const replaceExercise = require("../app/utils/replaceExercise");
describe("Workout Gen", () => {
  test("should generate correct number of workouts based on days", () => {
    const days = ["monday", "wednesday", "friday"];
    const equipment = ["dumbbells", "gym", "bodyweight", "band"];
    const plan = generateWorkout(days, equipment);
    expect(Array.isArray(plan)).toBe(true);
    expect(plan.length).toBe(days.length);

    plan.forEach((day) => {
      expect(day).toHaveProperty("day");
      expect(day).toHaveProperty("exercises");
      expect(Array.isArray(day.exercises)).toBe(true);
      const compoundCount = day.exercises.filter((e) => e.isCompound).length;
      const isolationCount = day.exercises.filter((e) => !e.isCompound).length;
      expect(compoundCount).toBe(isolationCount);
      expect(day.exercises.length > 0).toBe(true);
    });
  });
  test("should generate correct number of workouts based on days", () => {
    const days = ["monday", "friday"];
    const equipment = ["dumbbells", "gym", "bodyweight", "band"];
    const plan = generateWorkout(days, equipment);
    expect(Array.isArray(plan)).toBe(true);
    expect(plan.length).toBe(days.length);

    plan.forEach((day) => {
      expect(day).toHaveProperty("day");
      expect(day).toHaveProperty("exercises");
      expect(Array.isArray(day.exercises)).toBe(true);
      const compoundCount = day.exercises.filter((e) => e.isCompound).length;
      const isolationCount = day.exercises.filter((e) => !e.isCompound).length;
      expect(compoundCount).toBe(isolationCount);
      expect(day.exercises.length > 0).toBe(true);
    });
  });
  test("should generate correct number of workouts based on days", () => {
    const days = ["monday", "tuesday", "thursday", "friday", "sunday"];
    const equipment = ["dumbbells", "gym", "bodyweight", "band"];
    const plan = generateWorkout(days, equipment);
    console.log(JSON.stringify(plan, null, 2));
    expect(Array.isArray(plan)).toBe(true);
    expect(plan.length).toBe(days.length);

    plan.forEach((day) => {
      expect(day).toHaveProperty("day");
      expect(day).toHaveProperty("exercises");
      expect(Array.isArray(day.exercises)).toBe(true);
      const compoundCount = day.exercises.filter((e) => e.isCompound).length;
      const isolationCount = day.exercises.filter((e) => !e.isCompound).length;
      expect(compoundCount).toBe(isolationCount);
      expect(day.exercises.length > 0).toBe(true);
    });
  });
  test("should generate 6 exercises per day, 3 compound and 3 isolation", () => {
    const days = ["monday", "tuesday", "thursday", "friday", "sunday"];
    const equipment = ["dumbbells", "gym", "bodyweight", "band"];
    const plan = generateWorkout(days, equipment);
    console.log(JSON.stringify(plan, null, 2));
    expect(Array.isArray(plan)).toBe(true);
    expect(plan.length).toBe(days.length);

    plan.forEach((day) => {
      expect(day).toHaveProperty("day");
      expect(day).toHaveProperty("exercises");
      expect(Array.isArray(day.exercises)).toBe(true);
      const compoundCount = day.exercises.filter((e) => e.isCompound).length;
      const isolationCount = day.exercises.filter((e) => !e.isCompound).length;
      expect(compoundCount).toBe(3);
      expect(isolationCount).toBe(3);
      expect(day.exercises.length > 0).toBe(true);
    });
  });
  test("should generate 6 exercises per day, 3 compound and 3 isolation", () => {
    const days = [
      "monday",
      "tuesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    const equipment = ["dumbbells", "gym", "bodyweight", "band"];
    const plan = generateWorkout(days, equipment);
    console.log(JSON.stringify(plan, null, 2));
    expect(Array.isArray(plan)).toBe(true);
    expect(plan.length).toBe(days.length);

    plan.forEach((day) => {
      expect(day).toHaveProperty("day");
      expect(day).toHaveProperty("exercises");
      expect(Array.isArray(day.exercises)).toBe(true);
      const compoundCount = day.exercises.filter((e) => e.isCompound).length;
      const isolationCount = day.exercises.filter((e) => !e.isCompound).length;
      expect(compoundCount).toBe(3);
      expect(isolationCount).toBe(3);
      expect(day.exercises.length > 0).toBe(true);
    });
  });
});
describe.only("replace exercise", () => {
  test("provides a list of exercises with the same type", () => {
    const exercise = {
      name: "Romanian Deadlift",
      type: ["legs"],
      equipment: ["dumbbells", "gym"],
      isCompound: true,
      muscleFocus: ["glutes", "hams"],
      movement: "hinge",
    };
    const exercises = replaceExercise(exercise);
    expect(Array.isArray(exercises)).toBe(true);
    expect(exercises.length).toBe(5);

    exercises.forEach((ex) => {
      expect(ex).toHaveProperty("name");
      expect(ex.type).toEqual(["legs"]);
    });
  });
  test("provides a list of exercises with the same type", () => {
    const exercise = {
      name: "Pull-Up",
      type: ["pull"],
      equipment: ["gym", "bodyweight"],
      isCompound: true,
      muscleFocus: ["lats", "biceps", "upper back"],
      movement: "pull",
    };
    const exercises = replaceExercise(exercise);
    expect(Array.isArray(exercises)).toBe(true);
    expect(exercises.length).toBe(5);

    exercises.forEach((ex) => {
      expect(ex).toHaveProperty("name");
      expect(ex.type).toEqual(["pull"]);
    });
  });
  test("provides a list of exercises with the same type", () => {
    const exercise = {
      name: "Dumbbell Bench Press",
      type: ["push"],
      equipment: ["dumbbells", "gym"],
      isCompound: true,
      muscleFocus: ["chest", "triceps", "shoulders"],
      movement: "press",
    };
    const exercises = replaceExercise(exercise);
    expect(Array.isArray(exercises)).toBe(true);
    expect(exercises.length).toBe(5);

    exercises.forEach((ex) => {
      expect(ex).toHaveProperty("name");
      expect(ex.type).toEqual(["push"]);
    });
  });
});

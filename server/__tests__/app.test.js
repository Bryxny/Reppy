const request = require("supertest");
const express = require("express");
const router = require("../app/routes/workoutRoutes");

const app = express();
app.use(express.json());
app.use("/api", router);

describe("Generate", () => {
  test("POST /api/generate-plan returns 200 and 3 day workout plan", async () => {
    const response = await request(app)
      .post("/api/generate-plan")
      .send({
        days: ["monday", "wednesday", "friday"],
        equipment: ["dumbbells", "bodyweight"],
      });
    expect(response.statusCode).toBe(200);
  });
  test("POST /api/generate-plan returns 200 and 4 day workout plan", async () => {
    const response = await request(app)
      .post("/api/generate-plan")
      .send({
        days: ["monday", "wednesday", "friday", "sunday"],
        equipment: ["dumbbells", "gym"],
      });
    expect(response.statusCode).toBe(200);
  });
  test("POST /api/generate-plan returns 200 and 2 day workout plan", async () => {
    const response = await request(app)
      .post("/api/generate-plan")
      .send({
        days: ["monday", "sunday"],
        equipment: ["dumbbells", "gym"],
      });
    expect(response.statusCode).toBe(200);
    for (const day of response.body) {
      for (const ex of day.exercises) {
        expect(ex).not.toBeNull();
      }
    }
  });
  test("POST /api/generate-plan returns 200 and 5 day workout plan", async () => {
    const response = await request(app)
      .post("/api/generate-plan")
      .send({
        days: ["monday", "wednesday", "friday", "saturday", "sunday"],
        equipment: ["dumbbells", "barbell", "gym", "machine"],
      });
    expect(response.statusCode).toBe(200);
    for (const day of response.body) {
      for (const ex of day.exercises) {
        expect(ex).not.toBeNull();
      }
    }
  });
  test("POST /api/generate-plan returns 200 and 6 day workout plan", async () => {
    const response = await request(app)
      .post("/api/generate-plan")
      .send({
        days: [
          "monday",
          "tuesday",
          "wednesday",
          "friday",
          "saturday",
          "sunday",
        ],
        equipment: ["dumbbells", "barbell", "gym", "machine"],
      });
    expect(response.statusCode).toBe(200);
    for (const day of response.body) {
      for (const ex of day.exercises) {
        expect(ex).not.toBeNull();
      }
    }
  });
});

describe("Alternatives", () => {
  test("POST /api/get-alternatives returns 200 and up to 5 new exercises", async () => {
    const response = await request(app)
      .post("/api/get-alternatives")
      .send({
        exercise: {
          name: "Pull-Up",
          type: ["pull"],
          equipment: ["gym", "bodyweight"],
          isCompound: true,
          muscleFocus: ["lats", "biceps", "upper back"],
          movement: "pull",
        },
        equipment: ["dumbells", "gym"],
      });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length > 0).toBe(true);
    for (const exercise of response.body) {
      expect(exercise.type).toEqual(["pull"]);
    }
  });
  test("POST /api/get-alternatives returns 200 and up to 5 new exercises", async () => {
    const response = await request(app)
      .post("/api/get-alternatives")
      .send({
        exercise: {
          name: "Romanian Deadlift",
          type: ["legs"],
          equipment: ["dumbbells", "gym"],
          isCompound: true,
          muscleFocus: ["glutes", "hams"],
          movement: "hinge",
        },
        equipment: ["dumbells", "gym"],
      });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length > 0).toBe(true);
    for (const exercise of response.body) {
      expect(exercise.type).toEqual(["legs"]);
    }
  });
  test("POST /api/get-alternatives returns 200 and up to 5 new exercises", async () => {
    const response = await request(app)
      .post("/api/get-alternatives")
      .send({
        exercise: {
          name: "Push-Up",
          type: ["push"],
          equipment: ["bodyweight"],
          isCompound: true,
          muscleFocus: ["chest", "shoulders", "triceps"],
          movement: "press",
        },
        equipment: ["dumbells", "gym"],
      });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length > 0).toBe(true);
    for (const exercise of response.body) {
      expect(exercise.type).toEqual(["push"]);
    }
  });
  test("POST /api/get-alternatives excludes exercises already in workout and returns up to 5 new exercises", async () => {
    const excludedExercises = [
      {
        name: "Inverted Row",
        type: ["pull"],
        equipment: ["gym", "bodyweight"],
        isCompound: true,
        muscleFocus: ["lats", "biceps", "upper back"],
        movement: "pull",
      },
      {
        name: "Chin-Up",
        type: ["pull"],
        equipment: ["gym", "bodyweight"],
        isCompound: true,
        muscleFocus: ["biceps", "lats"],
        movement: "pull",
      },
    ];

    const response = await request(app)
      .post("/api/get-alternatives")
      .send({
        exercise: {
          name: "Pull-Up",
          type: ["pull"],
          equipment: ["gym", "bodyweight"],
          isCompound: true,
          muscleFocus: ["lats", "biceps", "upper back"],
          movement: "pull",
        },
        equipment: ["dumbells", "gym"],
        excludedExercises: excludedExercises,
      });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeLessThanOrEqual(5);
    const excludedNames = excludedExercises.map((ex) => ex.name);
    for (const exercise of response.body) {
      expect(exercise.type).toEqual(["pull"]);
      expect(excludedNames).not.toContain(exercise.name);
    }
  });
});

describe("Replace", () => {
  test("POST /api/swap-exercise returns 200 and responds with new plan", async () => {
    const plan = [
      {
        day: "monday",
        type: "Push",
        exercises: [
          {
            name: "Bench Press",
            type: ["push"],
            equipment: ["gym"],
            isCompound: true,
            muscleFocus: ["chest", "shoulders", "triceps"],
            movement: "press",
          },
          {
            name: "Push-Up",
            type: ["push"],
            equipment: ["bodyweight"],
            isCompound: true,
            muscleFocus: ["chest", "shoulders", "triceps"],
            movement: "press",
          },
          {
            name: "Dumbbell Bench Press",
            type: ["push"],
            equipment: ["dumbbells", "gym"],
            isCompound: true,
            muscleFocus: ["chest", "triceps", "shoulders"],
            movement: "press",
          },
          {
            name: "Chest Fly",
            type: ["push"],
            equipment: ["dumbbells", "gym"],
            isCompound: false,
            muscleFocus: ["chest"],
            movement: "press",
          },
          {
            name: "Cable Chest Fly",
            type: ["push"],
            equipment: ["gym", "cable machine"],
            isCompound: false,
            muscleFocus: ["chest"],
            movement: "press",
          },
          {
            name: "Incline Chest Fly",
            type: ["push"],
            equipment: ["dumbbells", "gym"],
            isCompound: false,
            muscleFocus: ["upper chest"],
            movement: "press",
          },
        ],
      },
      {
        day: "wednesday",
        type: "Pull",
        exercises: [
          {
            name: "Deadlift",
            type: ["pull"],
            equipment: ["gym"],
            isCompound: true,
            muscleFocus: ["glutes", "hams", "back"],
            movement: "hinge",
          },
          {
            name: "Pull-Up",
            type: ["pull"],
            equipment: ["gym", "bodyweight"],
            isCompound: true,
            muscleFocus: ["lats", "biceps", "upper back"],
            movement: "pull",
          },
          {
            name: "Barbell Row",
            type: ["pull"],
            equipment: ["gym"],
            isCompound: true,
            muscleFocus: ["lats", "upper back", "biceps"],
            movement: "pull",
          },
          {
            name: "Reverse Fly",
            type: ["pull"],
            equipment: ["dumbbells", "gym"],
            isCompound: false,
            muscleFocus: ["rear delts", "upper back"],
            movement: "pull",
          },
          {
            name: "Bicep Curl",
            type: ["pull"],
            equipment: ["barbell", "dumbbells", "gym"],
            isCompound: false,
            muscleFocus: ["biceps"],
            movement: "pull",
          },
          {
            name: "Hammer Curl",
            type: ["pull"],
            equipment: ["dumbbells"],
            isCompound: false,
            muscleFocus: ["biceps", "forearms"],
            movement: "pull",
          },
        ],
      },
      {
        day: "friday",
        type: "Legs",
        exercises: [
          {
            name: "Barbell Back Squat",
            type: ["legs"],
            equipment: ["gym"],
            isCompound: true,
            muscleFocus: ["glutes", "quads", "hams"],
            movement: "squat",
          },
          {
            name: "Romanian Deadlift",
            type: ["legs"],
            equipment: ["dumbbells", "gym"],
            isCompound: true,
            muscleFocus: ["glutes", "hams"],
            movement: "hinge",
          },
          {
            name: "Bulgarian Split Squat",
            type: ["legs"],
            equipment: ["dumbbells", "gym", "bodyweight"],
            isCompound: true,
            muscleFocus: ["glutes", "quads"],
            movement: "lunge",
          },
          {
            name: "Leg Curl",
            type: ["legs"],
            equipment: ["gym"],
            isCompound: false,
            muscleFocus: ["hams"],
            movement: "isolation",
          },
          {
            name: "Leg Extension",
            type: ["legs"],
            equipment: ["gym"],
            isCompound: false,
            muscleFocus: ["quads"],
            movement: "isolation",
          },
          {
            name: "Wall Sit",
            type: ["legs"],
            equipment: ["bodyweight"],
            isCompound: false,
            muscleFocus: ["quads"],
            movement: "squat",
          },
        ],
      },
    ];
    const expectedPlan = [
      {
        day: "monday",
        type: "Push",
        exercises: [
          {
            name: "Bench Press",
            type: ["push"],
            equipment: ["gym"],
            isCompound: true,
            muscleFocus: ["chest", "shoulders", "triceps"],
            movement: "press",
          },
          {
            name: "Incline Dumbbell Press",
            type: ["push"],
            equipment: ["dumbbells", "gym"],
            isCompound: true,
            muscleFocus: ["upper chest", "shoulders", "triceps"],
            movement: "press",
          },
          {
            name: "Dumbbell Bench Press",
            type: ["push"],
            equipment: ["dumbbells", "gym"],
            isCompound: true,
            muscleFocus: ["chest", "triceps", "shoulders"],
            movement: "press",
          },
          {
            name: "Chest Fly",
            type: ["push"],
            equipment: ["dumbbells", "gym"],
            isCompound: false,
            muscleFocus: ["chest"],
            movement: "press",
          },
          {
            name: "Cable Chest Fly",
            type: ["push"],
            equipment: ["gym", "cable machine"],
            isCompound: false,
            muscleFocus: ["chest"],
            movement: "press",
          },
          {
            name: "Incline Chest Fly",
            type: ["push"],
            equipment: ["dumbbells", "gym"],
            isCompound: false,
            muscleFocus: ["upper chest"],
            movement: "press",
          },
        ],
      },
      {
        day: "wednesday",
        type: "Pull",
        exercises: [
          {
            name: "Deadlift",
            type: ["pull"],
            equipment: ["gym"],
            isCompound: true,
            muscleFocus: ["glutes", "hams", "back"],
            movement: "hinge",
          },
          {
            name: "Pull-Up",
            type: ["pull"],
            equipment: ["gym", "bodyweight"],
            isCompound: true,
            muscleFocus: ["lats", "biceps", "upper back"],
            movement: "pull",
          },
          {
            name: "Barbell Row",
            type: ["pull"],
            equipment: ["gym"],
            isCompound: true,
            muscleFocus: ["lats", "upper back", "biceps"],
            movement: "pull",
          },
          {
            name: "Reverse Fly",
            type: ["pull"],
            equipment: ["dumbbells", "gym"],
            isCompound: false,
            muscleFocus: ["rear delts", "upper back"],
            movement: "pull",
          },
          {
            name: "Bicep Curl",
            type: ["pull"],
            equipment: ["barbell", "dumbbells", "gym"],
            isCompound: false,
            muscleFocus: ["biceps"],
            movement: "pull",
          },
          {
            name: "Hammer Curl",
            type: ["pull"],
            equipment: ["dumbbells"],
            isCompound: false,
            muscleFocus: ["biceps", "forearms"],
            movement: "pull",
          },
        ],
      },
      {
        day: "friday",
        type: "Legs",
        exercises: [
          {
            name: "Barbell Back Squat",
            type: ["legs"],
            equipment: ["gym"],
            isCompound: true,
            muscleFocus: ["glutes", "quads", "hams"],
            movement: "squat",
          },
          {
            name: "Romanian Deadlift",
            type: ["legs"],
            equipment: ["dumbbells", "gym"],
            isCompound: true,
            muscleFocus: ["glutes", "hams"],
            movement: "hinge",
          },
          {
            name: "Bulgarian Split Squat",
            type: ["legs"],
            equipment: ["dumbbells", "gym", "bodyweight"],
            isCompound: true,
            muscleFocus: ["glutes", "quads"],
            movement: "lunge",
          },
          {
            name: "Leg Curl",
            type: ["legs"],
            equipment: ["gym"],
            isCompound: false,
            muscleFocus: ["hams"],
            movement: "isolation",
          },
          {
            name: "Leg Extension",
            type: ["legs"],
            equipment: ["gym"],
            isCompound: false,
            muscleFocus: ["quads"],
            movement: "isolation",
          },
          {
            name: "Wall Sit",
            type: ["legs"],
            equipment: ["bodyweight"],
            isCompound: false,
            muscleFocus: ["quads"],
            movement: "squat",
          },
        ],
      },
    ];
    const oldEx = { name: "Push-Up" };
    const newEx = {
      name: "Incline Dumbbell Press",
      type: ["push"],
      equipment: ["dumbbells", "gym"],
      isCompound: true,
      muscleFocus: ["upper chest", "shoulders", "triceps"],
      movement: "press",
    };
    const response = await request(app).post("/api/swap-exercise").send({
      plan,
      oldEx,
      newEx,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedPlan);
  });
});

const { legExercises } = require("../data/legExercises");
const { pullExercises } = require("../data/pullExercises");
const { pushExercises } = require("../data/pushExercises");

const splitMap = {
  2: ["Full Body 1", "Full Body 2"],
  3: ["Push", "Pull", "Legs"],
  4: ["Push", "Quads", "Pull", "Glutes"],
  5: ["Push", "Pull", "Quads", "Upper", "Glutes"],
  6: ["Push", "Pull", "Quads", "Push", "Pull", "Glutes"],
};

function generateWorkout(days, equipment) {
  const routine = [];
  const dayTypes = splitMap[days.length];
  const legCompound = legExercises.filter((exercise) => {
    return (
      exercise.isCompound === true &&
      exercise.equipment.some((eq) => equipment.includes(eq))
    );
  });
  const legIsolation = legExercises.filter((exercise) => {
    return (
      exercise.isCompound === false &&
      exercise.equipment.some((eq) => equipment.includes(eq))
    );
  });
  const pullCompound = pullExercises.filter((exercise) => {
    return (
      exercise.isCompound === true &&
      exercise.equipment.some((eq) => equipment.includes(eq))
    );
  });
  const pullIsolation = pullExercises.filter((exercise) => {
    return (
      exercise.isCompound === false &&
      exercise.equipment.some((eq) => equipment.includes(eq))
    );
  });
  const pushCompound = pushExercises.filter((exercise) => {
    return (
      exercise.isCompound === true &&
      exercise.equipment.some((eq) => equipment.includes(eq))
    );
  });
  const pushIsolation = pushExercises.filter((exercise) => {
    return (
      exercise.isCompound === false &&
      exercise.equipment.some((eq) => equipment.includes(eq))
    );
  });
  const legCompoundGlute = legCompound.filter((ex) =>
    ex.muscleFocus.includes("glutes")
  );
  const legCompoundQuad = legCompound.filter((ex) =>
    ex.muscleFocus.includes("quads")
  );
  const legIsolationGlute = legIsolation.filter((ex) =>
    ex.muscleFocus.includes("glutes")
  );
  const legIsolationQuad = legIsolation.filter((ex) =>
    ex.muscleFocus.includes("quads")
  );

  let pullDayCount = 0;
  let pushDayCount = 0;
  dayTypes.forEach((type, i) => {
    let compound = [];
    let isolation = [];

    switch (type.toLowerCase()) {
      case "push":
        pushDayCount++;
        if (pushDayCount === 1) {
          compound = pushCompound;
          isolation = pushIsolation;
        } else if (pushDayCount === 2) {
          compound = pushCompound.slice(3);
          isolation = pushIsolation.slice(3);
        }
        break;
      case "pull":
        pullDayCount++;
        if (pullDayCount === 1) {
          compound = pullCompound;
          isolation = pullIsolation;
        } else if (pullDayCount === 2) {
          compound = pullCompound.slice(3);
          isolation = pullIsolation.slice(3);
        }
        break;
      case "legs":
        compound = legCompound;
        isolation = legIsolation;
        break;
      case "full body 1":
        compound = [legCompound[0], pushCompound[0], pullCompound[0]];
        isolation = [legIsolation[0], pushIsolation[0], pullIsolation[0]];
        break;
      case "full body 2":
        compound = [legCompound[1], pushCompound[1], pullCompound[1]];
        isolation = [legIsolation[1], pushIsolation[1], pullIsolation[1]];
        break;
      case "upper":
        if (pushDayCount === 1 || pullDayCount === 1) {
          compound = [...pushCompound.slice(0, 2), ...pullCompound.slice(0, 1)];
          isolation = [
            ...pushIsolation.slice(0, 2),
            ...pullIsolation.slice(0, 1),
          ];
        } else {
          compound = [...pushCompound.slice(3, 5), ...pullCompound.slice(3, 4)];
          isolation = [
            ...pushIsolation.slice(3, 5),
            ...pullIsolation.slice(3, 4),
          ];
        }
        break;
      case "quads":
        compound = legCompoundQuad;
        isolation = legIsolationQuad;
        break;
      case "glutes":
        compound = legCompoundGlute;
        isolation = legIsolationGlute;
        break;
      default:
        compound = [];
        isolation = [];
    }
    routine.push({
      day: days[i],
      type,
      exercises: [...compound.slice(0, 3), ...isolation.slice(0, 3)].filter(
        Boolean
      ),
    });
  });
  // console.log("Routine JSON:\n", JSON.stringify(routine, null, 2));
  return routine;
}

module.exports = generateWorkout;

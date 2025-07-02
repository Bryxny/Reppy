import axios from "axios";

const endpoint = `http://192.168.1.224:9090/api`;

export const createWorkout = (days, equipment) => {
  console.log("creating workout");
  return axios
    .post(`${endpoint}/generate-plan`, { days, equipment })
    .then((response) => {
      console.log("response data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("API error:", error);
      throw error;
    });
};

export const alternativeExercises = (
  exercise,
  equipment,
  excludedExercises
) => {
  return axios
    .post(`${endpoint}/get-alternatives`, {
      exercise: exercise,
      equipment: equipment,
      excludedExercises: excludedExercises,
    })
    .then((response) => {
      console.log("response data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("API error:", error);
      throw error;
    });
};

export const replaceExercise = (plan, oldEx, newEx) => {
  return axios
    .post(`${endpoint}/swap-exercise`, {
      plan: plan,
      oldEx: oldEx,
      newEx: newEx,
    })
    .then((response) => {
      console.log("response data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("API error:", error);
      throw error;
    });
};

export const deleteExercise = (plan, exercise) => {
  console.log("exercise", exercise);
  return axios
    .post(`${endpoint}/delete-exercise`, {
      plan: plan,
      exercise: exercise,
    })
    .then((response) => {
      console.log("response data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("API error:", error);
      throw error;
    });
};

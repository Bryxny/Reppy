import axios from "axios";

const endpoint = `http://192.168.1.224:9090/api`;

export const createWorkout = (days, equipment) => {
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

export const alternativeExercises = (exercise, equipment) => {
  console.log(exercise);
  return axios
    .post(`${endpoint}/get-alternatives`, {
      exercise: exercise,
      equipment: equipment,
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

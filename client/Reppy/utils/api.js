import axios from "axios";

const endpoint = `http://192.168.1.224:9090/api`;

export const createWorkout = (days, equipment) => {
  console.log(equipment);
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

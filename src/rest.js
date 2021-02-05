import axios from "axios";

class Rest {
  getTasks() {
    return axios.get("/tasks");
  }

  getTaskById(id) {
    return axios.get("/tasks/" + id);
  }
}

const rest = new Rest();

export default rest;

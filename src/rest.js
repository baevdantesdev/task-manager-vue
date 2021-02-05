import axios from "axios";

class Rest {
  getTasks() {
    return axios.get("/tasks");
  }

  getTaskById(id) {
    return axios.get("/tasks/" + id);
  }

  deleteTask(id) {
    return axios.delete("/tasks/" + id);
  }

  updateTask(task) {
    return axios.patch(`/tasks/${task.id}`, task);
  }

  addTask(task) {
    return axios.post("/tasks/", {
      ...task
    });
  }
}

const rest = new Rest();

export default rest;

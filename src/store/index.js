import Vue from "vue";
import Vuex from "vuex";
import rest from "@/rest";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tasks: [],
    currentTask: null,
    isLoading: false
  },
  mutations: {
    setTasks: (state, payload) => {
      state.tasks = payload;
    },
    setTask: (state, payload) => {
      state.currentTask = payload;
    },
    clearCurrentTask: state => {
      state.currentTask = null;
    },
    setLoading: (state, flag) => {
      state.isLoading = flag;
    }
  },
  actions: {
    getTasks: ({ commit }) => {
      commit("setLoading", true);
      return rest
        .getTasks()
        .then(res => {
          commit("setTasks", res.data);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    getTaskById: ({ commit }, id) => {
      commit("setLoading", true);
      return rest
        .getTaskById(id)
        .then(res => {
          commit("setTask", res.data);
          commit("setLoading", false);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    deleteTask: ({}, id) => {
      return rest.deleteTask(id);
    },
    updateTask: ({}, task) => {
      return rest.updateTask(task);
    },
    addTask: ({}, task) => {
      return rest.addTask(task);
    }
  }
});

export default store;

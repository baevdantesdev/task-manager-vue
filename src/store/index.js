import Vue from "vue";
import Vuex from "vuex";
import rest from "@/rest";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tasks: [],
    currentTask: null
  },
  mutations: {
    setTasks: (state, payload) => {
      state.tasks = payload;
    },
    setTask: (state, payload) => {
      state.currentTask = payload;
    }
  },
  actions: {
    getTasks: ({ commit }) => {
      return rest.getTasks().then(res => {
        commit("setTasks", res.data);
      });
    },
    getTaskById: ({ commit }, id) => {
      return rest.getTaskById(id).then(res => {
        commit("setTask", res.data);
      });
    }
  }
});

export default store;

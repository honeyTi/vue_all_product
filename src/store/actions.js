import * as types from './mutation-type.js';

export default {
  nameAsyn({ commit }, { age, name, token }) {
    commit(types.SET_NAME, name);
    commit(types.SET_AGE, age);
    commit(types.SET_TOKEN, token);
  }
};

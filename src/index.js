import { assign } from 'object-assign';

const createReducer = (defaultState = {}, reducer) => (state, action) => {
  let states = {};
  let handleAction = (type, ...args) => {
    states[type] = args;
  }
  let reduceStates = (state = defaultState, action) => {
    let actionData = states[action.type];

    if (!actionData) return state;

    // Handle a single 'null' value, which means to reset everything back to default.
    if (actionData.length === 1 && actionData[0] === null) {
      return assign({});
    }

    // Handle function values.
    actionData = actionData.map((value, index) => {
      if (typeof value === 'function') {
        return value(state, action);
      }

      return value;
    });

    return assign({}, state, defaultState, ...actionData);
  }

  reducer(handleAction);
  return reduceStates;
}

export default createReducer;

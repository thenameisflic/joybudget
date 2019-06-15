const initialActions = [];

const actions = (state = initialActions, action) => {
  switch (action.type) {
    case "PERFORMED_ACTION": {
      state = [...state, action.action]
      break;
    }
    default:
      return state;
  }
  return state;
};

export default actions;

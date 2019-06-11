const initialActions = [
  {
    actionName: "UPDATED_RECURRING_EXPENSE",
    recurringExpense: {
      name: "phone",
      oldValue: 18.0,
      newValue: 40.0,
      at: "2019-06-11 14:22"
    }
  },
  {
    actionName: "CREATED_EXPENSE",
    expense: {
      guid: "0skm2io3m-0asmd",
      value: 7.0,
      type: "Transportation",
      at: "2019-06-11 14:25",
      note: "This is simply not my way"
    }
  }
];

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

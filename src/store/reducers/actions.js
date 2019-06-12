const initialActions = [
  {
    actionName: "UPDATED_RECURRING_EXPENSE",
    recurringExpense: {
      name: "phone",
      oldValue: 0,
      newValue: -40.0,
      at: "2019-06-11 14:22"
    }
  },
  {
    actionName: "UPDATED_RECURRING_EXPENSE",
    recurringExpense: {
      name: "mainIncome",
      oldValue: 0,
      newValue: 1200.0,
      at: "2019-06-11 14:22"
    }
  },
  {
    actionName: "CREATED_EXPENSE",
    expense: {
      guid: "0skm2io3m-0asmd",
      value: -7.0,
      tag: "Transportation",
      at: "2019-06-12 14:25",
      note: "Uber to work"
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

import { createSelector } from "reselect";

const serverRecurringExpensesSelector = state => state.recurringExpenses;
const recurringExpensesActionsSelector = state => 
  state.actions.filter(a => a.actionName === "UPDATED_RECURRING_EXPENSE");


export const recurringExpenses = createSelector(
  [serverRecurringExpensesSelector, recurringExpensesActionsSelector],
  (serverRecurringExpenses, recurringExpensesActions) => {
    const { data } = serverRecurringExpenses;
    recurringExpensesActions.forEach(({recurringExpense}) => {
      const v = data.find(e => e.name === recurringExpense.name);
      if (v)
        v.value = recurringExpense.newValue;
    });
    return {...serverRecurringExpenses, data};
  }
);

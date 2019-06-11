import { createSelector } from "reselect";
import { areSameMonth, areSameWeek, daysInMonth, areSameDay } from "../../utils";

const expensesSelector = state => state.expenses;
const expensesActionsSelector = state => state.actions.filter(a => a.actionName === "CREATED_EXPENSE");
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

export const expenses = createSelector(
  [expensesSelector, expensesActionsSelector], (serverExpenses, actions) => {
    let { data } = serverExpenses;
    data = [...data, ...actions.map(e => e.expense)];
    return {...serverExpenses, data};
  }
);

export const monthlySpending = createSelector(
  [recurringExpenses, expenses], (recurringExpenses, expenses) => {
    return {
      max: recurringExpenses.data.filter(d => d.value > 0).reduce((acc, data) => acc + data.value, 0),
      recurrent: recurringExpenses.data.filter(d => d.value < 0).reduce((acc, data) => acc - data.value, 0),
      current: expenses.data.filter(d => d.value < 0 && areSameMonth(new Date(d.at), new Date())).reduce((acc, data) => acc - data.value, 0)
    };
  }
);

export const weeklySpending = createSelector(
  [monthlySpending, expenses], (monthlySpending, expenses) => {
    return {
      max: monthlySpending.max / 4,
      recurrent: monthlySpending.recurrent / 4,
      current: expenses.data.filter(d => d.value < 0 && areSameWeek(new Date(d.at), new Date())).reduce((acc, data) => acc - data.value, 0)
    };
  }
);

export const dailySpending = createSelector(
  [monthlySpending, expenses], (dailySpending, expenses) => {
    const days = daysInMonth(new Date().getMonth() + 1, new Date().getFullYear());
    return {
      max: dailySpending.max / days,
      recurrent: dailySpending.recurrent / days,
      current: expenses.data.filter(d => d.value < 0 && areSameDay(new Date(d.at), new Date())).reduce((acc, data) => acc - data.value, 0)
    };
  }
);

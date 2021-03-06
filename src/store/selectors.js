import { createSelector } from "reselect";
import {
  areSameMonth,
  areSameWeek,
  daysInMonth,
  areSameDay,
  unique
} from "../utils";
import { CHART_COLORS, AVAILABLE_TAGS } from "../constants";

const expensesSelector = state => state.expenses;
const createdExpenseActionsSelector = state =>
  state.actions.filter(a => a.actionName === "CREATED_EXPENSE");
const removedExpenseActionsSelector = state =>
  state.actions.filter(a => a.actionName === "REMOVED_EXPENSE");
const serverRecurringExpensesSelector = state => state.recurringExpenses;
const recurringExpensesActionsSelector = state =>
  state.actions.filter(a => a.actionName === "UPDATED_RECURRING_EXPENSE");

export const recurringExpenses = createSelector(
  [serverRecurringExpensesSelector, recurringExpensesActionsSelector],
  (serverRecurringExpenses, recurringExpensesActions) => {
    const { data } = serverRecurringExpenses;
    recurringExpensesActions.forEach(({ recurringExpense }) => {
      const v = data.find(e => e.name === recurringExpense.name);
      if (v) {
        v.value = recurringExpense.newValue;
      }
    });
    return { ...serverRecurringExpenses, data };
  }
);

export const expenses = createSelector(
  [
    expensesSelector,
    createdExpenseActionsSelector,
    removedExpenseActionsSelector
  ],
  (serverExpenses, createdActions, removedActions) => {
    let { data } = serverExpenses;
    const isNotExcluded = e =>
      !removedActions.find(({ expense }) => expense.guid === e.guid);
    data = [
      ...data.filter(isNotExcluded),
      ...createdActions.map(e => e.expense).filter(isNotExcluded)
    ];
    return { ...serverExpenses, data };
  }
);

export const monthlySpending = createSelector(
  [recurringExpenses, expenses],
  (recurringExpenses, expenses) => {
    return {
      max: recurringExpenses.data
        .filter(d => d.value > 0)
        .reduce((acc, data) => acc + data.value, 0),
      recurrent: recurringExpenses.data
        .filter(d => d.value < 0)
        .reduce((acc, data) => acc - data.value, 0),
      current: expenses.data
        .filter(d => d.value < 0 && areSameMonth(new Date(d.at), new Date()))
        .reduce((acc, data) => acc - data.value, 0)
    };
  }
);

export const weeklySpending = createSelector(
  [monthlySpending, expenses],
  (monthlySpending, expenses) => {
    return {
      max: monthlySpending.max / 4,
      recurrent: monthlySpending.recurrent / 4,
      current: expenses.data
        .filter(d => d.value < 0 && areSameWeek(new Date(d.at), new Date()))
        .reduce((acc, data) => acc - data.value, 0)
    };
  }
);

export const dailySpending = createSelector(
  [monthlySpending, expenses],
  (monthlySpending, expenses) => {
    const days = daysInMonth(
      new Date().getMonth() + 1,
      new Date().getFullYear()
    );
    return {
      max: monthlySpending.max / days,
      recurrent: monthlySpending.recurrent / days,
      current: expenses.data
        .filter(d => d.value < 0 && areSameDay(new Date(d.at), new Date()))
        .reduce((acc, data) => acc - data.value, 0)
    };
  }
);

export const expensesBreakdown = createSelector(
  [expenses],
  expenses => {
    const breakdown = expenses.data
      .filter(d => d.value < 0)
      .reduce((acc, exp) => {
        acc[exp.tag] = acc[exp.tag] ? acc[exp.tag] + exp.value : exp.value;
        return acc;
      }, {});
    return Object.entries(breakdown).map(([name, value], idx) => ({
      name,
      value: value * -1,
      fill: CHART_COLORS[idx],
      expenses: expenses.data.filter(e => e.tag === name)
    }));
  }
);

export const latestTags = createSelector(
  [expenses],
  ({ data }) => {
    return unique([
      ...data.sort((a, b) => (a.at < b.at ? 1 : -1)).map(e => e.tag),
      ...AVAILABLE_TAGS
    ]);
  }
);

export const expenseValueSuggestions = createSelector(
  [expenses],
  ({ data }) => {
    return data
      .sort((a, b) => (a.at < b.at ? 1 : -1))
      .reduce((acc, exp) => {
        acc[exp.tag] = acc[exp.tag]
          ? unique([...acc[exp.tag], exp.value])
          : [exp.value];
        return acc;
      }, {});
  }
);

export const noteSuggestions = createSelector(
  [expenses],
  ({ data }) => {
    return data
      .sort((a, b) => (a.at < b.at ? 1 : -1))
      .reduce((acc, exp) => {
        acc[exp.tag] = acc[exp.tag]
          ? unique([...acc[exp.tag], exp.note]).filter(n => n)
          : [exp.note];
        return acc;
      }, {});
  }
);

export const categories = createSelector(
  [recurringExpenses],
  ({ data }) => {
    return data
      .map(r => r.category)
      .filter((v, idx, arr) => arr.indexOf(v) === idx);
  }
);

import { format } from "date-fns";

export const updateRecurringExpense = (name, newValue, oldValue) => {
  return {
    type: "PERFORMED_ACTION",
    action: {
      actionName: "UPDATED_RECURRING_EXPENSE",
      recurringExpense: {
        name,
        oldValue,
        newValue,
        at: format(new Date(), "YYYY-MM-DD HH:mm"),
      }
    }
  };
}

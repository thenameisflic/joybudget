import { combineReducers } from "redux";

import recurringExpenses from "./recurring-expenses";
import actions from "./actions";
import expenses from "./expenses";

export default combineReducers({
  recurringExpenses,
  actions,
  expenses
});

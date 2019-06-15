import { format } from "date-fns";

const initialExpenses = {
  updatedAt: format(new Date(), "YYYY-MM-DD HH:mm"),
  data: []
};

const expenses = (state = initialExpenses, action) => {
  return state;
};

export default expenses;

const initialRecurringExpenses = {
  updatedAt: "2019-06-11 14:22:00",
  data: [
    {
      name: "mainIncome",
      label: "",
      value: 0.0,
      category: "Income",
    },
    {
      name: "phone",
      label: "Phone",
      value: 0.0,
      category: "Utilities"
    },
    {
      name: "internet",
      label: "Internet",
      value: 0.0,
      category: "Utilities"
    },
    {
      name: "electricity",
      label: "Electricity",
      value: 0.0,
      category: "Utilities"
    },
    {
      name: "otherUtilities",
      label: "Other Utilities",
      value: 0.0,
      category: "Utilities"
    },
    {
      name: "rent",
      label: "Rent",
      value: 0.0,
      category: "Bills"
    },
    {
      name: "loans",
      label: "Loans",
      value: 0.0,
      category: "Bills"
    },
    {
      name: "website",
      label: "Website",
      value: 0.0,
      category: "Bills"
    },
    {
      name: "doctor",
      label: "Doctor",
      value: 0.0,
      category: "Bills"
    },
    {
      name: "meds",
      label: "Meds",
      value: 0.0,
      category: "Bills"
    },
    {
      name: "otherBills",
      label: "Other Bills",
      value: 0.0,
      category: "Bills"
    },
    {
      name: "pets",
      label: "Pets",
      value: 0.0,
      category: "Other Expenses"
    },
    {
      name: "food",
      label: "Food",
      value: 0.0,
      category: "Other Expenses"
    },
    {
      name: "lunch",
      label: "Lunch / Takeout",
      value: 0.0,
      category: "Other Expenses"
    },
    {
      name: "uber",
      label: "Uber",
      value: 0.0,
      category: "Other Expenses"
    },
    {
      name: "subscriptions",
      label: "Subscriptions",
      value: 0.0,
      category: "Other Expenses"
    },
    {
      name: "games",
      label: "Games",
      value: 0.0,
      category: "Other Expenses"
    },
    {
      name: "exercise",
      label: "Exercise",
      value: 0.0,
      category: "Other Expenses"
    },
    {
      name: "otherOtherExpenses",
      label: "Others",
      value: 0.0,
      category: "Other Expenses"
    }
  ]
};

const recurringExpenses = (state = initialRecurringExpenses, action) => {
  return state;
};

export default recurringExpenses;

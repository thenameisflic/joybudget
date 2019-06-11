const initialExpenses = {
  updatedAt: "2019-06-11 14:22:00",
  data: [
    {
      guid: "masd0990129031m2",
      tag: "Food",
      value: -100.0,
      at: "2019-05-06 15:25",
      note: "Lunch at Burger King with Aefe"
    },
    {
      guid: "masd0990129031m2",
      tag: "Food",
      value: -20.0,
      at: "2019-06-06 15:25",
      note: "Lunch at Burger King with Aefe"
    },
    {
      guid: "masd0990129031m2",
      tag: "Food",
      value: -35.0,
      at: "2019-06-10 15:25",
      note: "Lunch at Burger King with Aefe"
    }
  ]
};

const expenses = (state = initialExpenses, action) => {
  return state;
};

export default expenses;

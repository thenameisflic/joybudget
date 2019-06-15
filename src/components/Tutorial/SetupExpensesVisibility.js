import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { categories, recurringExpenses } from "../../store/selectors";

function SetupExpensesVisibility({
  onContinue,
  categories,
  recurringExpenses,
  onToggleExpenseVisibility
}) {
  return (
    <>
      <p className="lead serif text-center mt-4">
        Alright, now let's talk about your expenses.
      </p>
      <h1 className="mt-2 text-center">
        Which of these do you spend money on?
      </h1>
      <div className="flex-grow-1" />
      <form onSubmit={onContinue}>
        {categories
          .filter(c => c !== "Income" && c !== "Savings")
          .map((category, idx) => (
            <React.Fragment key={idx}>
              <h5 className="mt-4 mb-1">{category}</h5>
              <div>
                {recurringExpenses.data
                  .filter(e => e.category === category)
                  .map((expense, idx) => (
                    <ExpenseButton
                      size="sm"
                      key={idx}
                      variant="outline-primary"
                      className={`mr-1 mt-1 rounded-pill ${expense.visible &&
                        "active"}`}
                      onClick={() => onToggleExpenseVisibility(expense)}
                    >
                      {expense.label}
                    </ExpenseButton>
                  ))}
              </div>
            </React.Fragment>
          ))}
        <Button variant="primary" onClick={onContinue} className="mt-4" block>
          Continue
        </Button>
      </form>
      <p className="serif text-center mt-3 mb-4">
        You can change all your info later.
      </p>
    </>
  );
}

const ExpenseButton = styled(Button)`
  &:hover,
  &:focus {
    background-color: #fff;
    color: var(--blue);
  }

  &.active {
    background-color: var(--blue);
    color: #fff;
  }
`;

const mapStateToProps = state => ({
  categories: categories(state),
  recurringExpenses: recurringExpenses(state)
});
const mapDispatchToProps = dispatch => ({
  onToggleExpenseVisibility: expense =>
    dispatch({ type: "TOGGLE_EXPENSE_VISIBILITY", expenseName: expense.name })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupExpensesVisibility);

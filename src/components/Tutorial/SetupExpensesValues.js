import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { recurringExpenses } from "../../store/selectors";
import { updateRecurringExpense } from "../../store/creators";
import ExpenseInput from "../ExpenseInput";

function SetupExpensesValues({
  onContinue,
  onUpdateExpense,
  recurringExpenses
}) {
  return (
    <form onSubmit={() => {
      onContinue();
    }}>
      <p className="lead serif text-center mt-4">
        We're gonna need just a few more details.
      </p>
      <h1 className="mt-2 text-center">
        How much do you spend per month with each one of these?
      </h1>
      <div className="flex-grow-1" />
      <div className="mt-4">
      {recurringExpenses.data
        .filter(e => e.visible)
        .map(expense => (
          <ExpenseInput
            key={expense.name}
            title={expense.label}
            initialValue={expense.value}
            name={expense.name}
            onUpdateExpense={(newValue, oldValue) =>
              onUpdateExpense(expense, newValue, oldValue)
            }
          />
        ))}
      </div>
      <Button type="submit" variant="primary" onClick={onContinue} block>
        Continue
      </Button>
      <p className="serif text-center mt-3 mb-4">
        You can change all your info later.
      </p>
    </form>
  );
}

const mapStateToProps = state => ({
  recurringExpenses: recurringExpenses(state)
});
const mapDispatchToProps = dispatch => ({
  onUpdateExpense: ({ name }, newValue, oldValue) =>
    dispatch(updateRecurringExpense(name, newValue, oldValue))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupExpensesValues);

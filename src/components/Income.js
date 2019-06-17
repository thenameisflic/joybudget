import React, { useEffect } from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import ExpenseInput from "./ExpenseInput";
import { connect } from "react-redux";
import { recurringExpenses, categories } from "../store/selectors";
import { updateRecurringExpense } from "../store/creators";

const Container = styled.div`
  padding: 1rem;
  padding-top: 1.5rem;
`;

const StickyHeader = styled.h5`
  position: sticky;
  top: 0;
  padding-bottom: 1rem;
  padding-top: 1rem;
  margin-bottom: 0;
  z-index: 10;
  background-color: #fff;
  margin-top: 0.5rem;
`;

function Income({ recurringExpenses, onUpdateExpense, categories }) {
  useEffect(() => {
    document.title = "Income and Expenses - Joybudget";
  });

  return (
    <Container>
      <Form>
      <h2 className="serif mb-0">Income</h2>
        {renderExpenses(
          recurringExpenses.data.filter(p => p.category === "Income"),
          onUpdateExpense
        )}
      <h2 className="serif mt-5">Expenses</h2>
        {categories.filter(c => c !== "Income").map(categoryName => (
          <div key={categoryName}>
            <StickyHeader>{categoryName}</StickyHeader>
            {renderExpenses(
              recurringExpenses.data
                .filter(e => e.category === categoryName)
                .filter(e => e !== "Income"),
              onUpdateExpense
            )}
          </div>
        ))}
      </Form>
    </Container>
  );
}

function renderExpenses(expenses, onUpdateExpense) {
  return expenses.map(expense => (
    <ExpenseInput
      key={expense.name}
      title={expense.label}
      name={expense.name}
      initialValue={expense.value}
      isIncome={expense.category === "Income"}
      onUpdateExpense={(newValue, oldValue) => 
        onUpdateExpense(expense, newValue, oldValue)
      }
    />
  ));
}

const mapStateToProps = state => {
  return {
    recurringExpenses: recurringExpenses(state),
    categories: categories(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateExpense: ({name}, newValue, oldValue) => {
      dispatch(updateRecurringExpense(name, newValue, oldValue));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Income);

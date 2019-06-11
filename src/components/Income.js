import React from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import ExpenseInput from "./ExpenseInput";
import IncomeInput from "./IncomeInput";
import { connect } from "react-redux";
import { recurringExpenses } from "../store/selectors";

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

function Income({ recurringExpenses, onUpdateExpense }) {
  
  return (
    <Container>
      <h2 className="serif mb-0">Income</h2>
      <Form>
        <IncomeInput title="" name="income" />
      </Form>
      <h2 className="serif mt-5">Expenses</h2>
      <Form>
        {
          getCategories(recurringExpenses.data).map(categoryName => <div key={categoryName}><StickyHeader>{categoryName}</StickyHeader>{recurringExpenses.data.filter(e => e.category === categoryName).map(expense => (
            <ExpenseInput
              key={expense.name}
              title={expense.label}
              name={expense.name}
              initialValue={expense.value}
              onUpdateExpense={(newValue, oldValue) =>
                onUpdateExpense(expense.name, newValue, oldValue)
              }
            />
          ))}</div>)
        }
      </Form>
    </Container>
  );
}

function getCategories(expenses) {
  return expenses.map(r => r.category).filter((v, idx, arr) => arr.indexOf(v) === idx);
}

const mapStateToProps = state => {
  return {
    recurringExpenses: recurringExpenses(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateExpense: (name, newValue, oldValue) => {
      dispatch({
        type: "PERFORMED_ACTION",
        action: {
          actionName: "UPDATED_RECURRING_EXPENSE",
          recurringExpense: {
            name,
            oldValue,
            newValue,
            at: new Date().getTime()
          }
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Income);

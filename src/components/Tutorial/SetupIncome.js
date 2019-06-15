import React, { useRef } from "react";
import styled from "styled-components";
import ExpenseInput from "../ExpenseInput";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { updateRecurringExpense } from "../../store/creators";

function SetupIncome({ income, onUpdateIncome, onContinue }) {
  const formRef = useRef(null);

  const scrollBottom = () => {
    setTimeout(() => {
      if (formRef.current)
        formRef.current.parentElement.scrollTo(0, 999999);
    }, 200);
  };

  return (
    <FormContainer ref={formRef} onSubmit={onContinue}>
      <p className="lead serif text-center mt-4">Let's get you set up.</p>
      <h1 className="serif text-center mt-2">
        How much do you earn each month?
      </h1>
      <div className="flex-grow-1" />
      <ExpenseInput
        initialValue={income.value}
        isIncome={true}
        name={income.name}
        onUpdateExpense={(newValue, oldValue) =>
          onUpdateIncome(income, newValue, oldValue)
        }
        onFocus={scrollBottom}
      />
      <p className="serif text-center mt-0">
        Your data never leaves your device and you can export it whenever you
        want.
      </p>
      <Button variant="primary" onClick={onContinue}>
        Continue
      </Button>
      <p className="serif text-center mt-3 mb-4">
        You can change all your info later.
      </p>
    </FormContainer>
  );
}

const mapStateToProps = state => ({
  income: state.recurringExpenses.data.find(e => e.category === "Income")
});

const mapDispatchToProps = dispatch => ({
  onUpdateIncome: ({ name }, newValue, oldValue) => {
    dispatch(updateRecurringExpense(name, newValue, oldValue));
  }
});

const FormContainer = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupIncome);

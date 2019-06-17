import React, { useRef } from "react";
import styled from "styled-components";
import ExpenseInput from "../ExpenseInput";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { updateRecurringExpense } from "../../store/creators";
import { blur } from "../../utils";
import { useTranslation } from "react-i18next";

function SetupIncome({ income, onUpdateIncome, onContinue }) {
  const { t } = useTranslation();
  const formRef = useRef(null);

  const scrollBottom = () => {
    setTimeout(() => {
      if (formRef.current)
        formRef.current.parentElement.scrollTo(0, 999999);
    }, 200);
  };

  return (
    <FormContainer ref={formRef} onSubmit={() => {
      blur();
      onContinue();
    }}>
      <p className="lead serif text-center mt-4">{t("letsGetYouSetUp")}</p>
      <h1 className="serif text-center mt-2">
        {t("howMuchDoYouEarn")}
      </h1>
      <div className="flex-grow-1" />
      <ExpenseInput
        initialValue={income.value}
        isIncome={true}
        name={income.name}
        onUpdateExpense={(newValue, oldValue) => {
          onUpdateIncome(income, newValue, oldValue)
        }}
        onFocus={scrollBottom}
      />
      <p className="serif text-center mt-0">
        {t("yourDataNeverLeavesYourDevice")}
      </p>
      <Button variant="primary" onClick={onContinue}>
        {t("continue")}
      </Button>
      <p className="serif text-center mt-3 mb-4">
        {t("youCanChangeAllYourInfoLater")}
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

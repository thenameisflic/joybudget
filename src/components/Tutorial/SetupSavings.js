import React, { useRef } from "react";
import styled from "styled-components";
import ExpenseInput from "../ExpenseInput";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { updateRecurringExpense } from "../../store/creators";
import { monthlySpending } from "../../store/selectors";
import numeral from "numeral";
import { blur } from "../../utils";
import { useTranslation } from "react-i18next";

function SetupIncome({ income, savings, monthlySpending, onUpdateSavings, onContinue }) {
  const formRef = useRef(null);
  const { t } = useTranslation();

  const scrollBottom = () => {
    setTimeout(() => {
      if (formRef.current)
        formRef.current.parentElement.scrollTo(0, 999999);
    }, 200);
  };

  const remainingBalance = monthlySpending.max - monthlySpending.recurrent;

  return (
    <FormContainer ref={formRef} onSubmit={() => {
      blur();
      onContinue();
    }}>
      <p className="lead serif text-center mt-4">{t("lastQuestion")}</p>
      <h1 className="serif text-center mt-2">
        {t("howMuchPlanningToSave")}
      </h1>
      <div className="flex-grow-1" />
      <ExpenseInput
        initialValue={savings.value}
        isIncome={false}
        name={savings.name}
        onUpdateExpense={(newValue, oldValue) =>
          onUpdateSavings(savings, newValue, oldValue)
        }
        onFocus={scrollBottom}
      />
      {
        remainingBalance > 0 && <>
           <p className="serif text-center mt-0">
            {t("afterExpensesYouShouldHaveLeft", {amount: numeral(remainingBalance).format("$0,0.00")})}
          </p>
          <p className="serif text-center mt-0">
            {t("weRecommendSaving", {amount: numeral(monthlySpending.max * 0.2).format("$0,0.00")})}
          </p>
        </>
      }
      {
        remainingBalance < 0 && <p className="serif text-center mt-0">You currently are spending {numeral(Math.abs(remainingBalance)).format("$0,0.00")} more than you earn.</p>
      }
      {
        remainingBalance === 0 && <p className="serif text-center mt-0">You don't have any money left after all your expenses.</p>
      }
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
  income: state.recurringExpenses.data.find(e => e.category === "Income"),
  savings: state.recurringExpenses.data.find(e => e.category === "Savings"),
  monthlySpending: monthlySpending(state)
});

const mapDispatchToProps = dispatch => ({
  onUpdateSavings: ({ name }, newValue, oldValue) => {
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

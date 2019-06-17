import React from "react";
import { connect } from "react-redux";
import { Button, Alert } from "react-bootstrap";
import { recurringExpenses } from "../../store/selectors";
import { updateRecurringExpense } from "../../store/creators";
import ExpenseInput from "../ExpenseInput";
import { useTranslation } from "react-i18next";

function SetupExpensesValues({
  onContinue,
  onUpdateExpense,
  recurringExpenses
}) {
  const { t } = useTranslation();

  return (
    <form onSubmit={() => {
      onContinue();
    }}>
      <p className="lead serif text-center mt-4">
        {t("needMoreDetails")}
      </p>
      <h1 className="mt-2 text-center">
        {t("howMuchDoYouSpend")}
      </h1>
      <Alert variant="primary" className="text-center">{t("tipConsumption")}</Alert>
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
        {t("continue")}
      </Button>
      <p className="serif text-center mt-3 mb-4">
        {t("youCanChangeAllYourInfoLater")}
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

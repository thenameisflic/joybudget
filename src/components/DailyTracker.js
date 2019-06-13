import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { expenses } from "../store/selectors";
import { connect } from "react-redux";
import numeral from "numeral";
import { areSameDay, formatDate } from "../utils";
import {
  parse,
  startOfWeek,
  startOfMonth,
  subWeeks,
  subMonths,
  endOfWeek,
  endOfMonth,
  isBefore,
  isAfter
} from "date-fns";
import { Dropdown, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

const Container = styled.div`
  padding: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 0;
`;

export const ChoiceBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const choiceStyle = `
  &:not(:target) {
    color: #757575;
  }

  &:target,
  &.active {
    font-weight: bold;
    color: var(--blue);
  }

  &:focus,
  &:hover {
    text-decoration: none;
  }
`;

export const ChoiceButton = styled(Button)`
  ${choiceStyle}
`;
export const ChoiceDropdownToggle = styled(Dropdown.Toggle)`
  ${choiceStyle}
`;
export const ChoiceDropdownMenu = styled(Dropdown.Menu)`
  border: none;
  background: none;
`;
export const CustomRangeContainer = styled.div`
  border-radius: 4px;
  border: solid 1px var(--blue);
  background-color: #fff;
  margin-bottom: 0.25rem;
`;

const ExpenseList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 0;
`;

const ExpenseItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const TotalExpenseItemContainer = styled.div`
  background-color: #fff;
  position: sticky;
  bottom: 0;
`;

const TotalExpenseItem = styled(ExpenseItem)`
  margin-left: -1rem;
  background-color: #f0f0f0;
  align-items: center;
  width: calc(100% + 2rem);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 0;
`;

const PickRangeLink = styled(Button)`
  border-radius: 4px;
  border: solid 1px #f0f0f0;
  margin-top: 0rem;
  background: #fff;

  &:focus,
  &:active,
  &:hover {
    text-decoration: none;
    color: var(--blue);
    background-color: #fff;
  }
`;

// Experimental!
const TotalAlignmentHelper = styled.div`
  width: 35px;
  margin-left: 1rem;
`;

function DailyTracker({ expenses, onRemoveExpense }) {
  const defaultDateLabel = "More";
  const [activeTab, setActiveTab] = useState(window.location.hash);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [dateLabel, setDateLabel] = useState(defaultDateLabel);
  const [isPickingRange, setPickingRange] = useState(false);

  useEffect(() => {
    if (window.location.hash === "") window.location.hash = "#today";
    setActiveTab(window.location.hash.split("#")[1]);
  }, []);

  const updateTab = tab => {
    window.location.hash = tab;
    setActiveTab(tab);
  };

  const updateCalendar = (date, endDate) => {
    const formatStr = endDate ? "MMM D" : "MMMM D";
    setDateLabel(
      `${formatDate(date, formatStr)}${
        endDate ? " - " + formatDate(endDate, formatStr) : ""
      }`
    );
    toggleDropdown();
    updateTab(
      `${date.toISOString().split("T")[0]}${
        endDate ? "_" + endDate.toISOString().split("T")[0] : ""
      }`
    );
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const togglePickingRange = evt => {
    evt.target.blur();
    evt.preventDefault();
    setTimeout(() => {
      setPickingRange(!isPickingRange);
      return false;
    }, 50);
  };

  const now = new Date();

  const getFilteredExpenses = expenses => {
    const { startDate, endDate } = tabToDate(activeTab);
    return expenses.filter(({ at }) => {
      const d = new Date(at);
      return (
        (areSameDay(d, startDate) || isAfter(d, startDate)) &&
        (areSameDay(d, endDate) || isBefore(d, endDate))
      );
    });
  };

  return (
    <Container>
      <h2 className="serif">Tracker</h2>
      <ChoiceBar>
        <Dropdown onToggle={toggleDropdown} show={isDropdownVisible}>
          <ChoiceDropdownToggle
            variant="link"
            id="dropdown-tracker"
            className={
              (isDropdownVisible || dateLabel !== defaultDateLabel) && "active"
            }
          >
            {dateLabel}
          </ChoiceDropdownToggle>

          <ChoiceDropdownMenu>
            {!isPickingRange && (
              <DatePicker
                inline
                selected={
                  activeTab === "yesterday" ||
                  activeTab === "today" ||
                  activeTab.includes("_")
                    ? now
                    : parse(activeTab)
                }
                onChange={date => updateCalendar(date)}
              />
            )}
            {isPickingRange && (
              <CustomRangeContainer>
                <Dropdown.Item
                  className="text-primary"
                  onClick={() => updateCalendar(startOfWeek(now), now)}
                >
                  This week
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-primary"
                  onClick={() =>
                    updateCalendar(
                      startOfWeek(subWeeks(now, 1)),
                      endOfWeek(subWeeks(now, 1))
                    )
                  }
                >
                  Last week
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-primary"
                  onClick={() => updateCalendar(startOfMonth(now), now)}
                >
                  This month
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-primary"
                  onClick={() =>
                    updateCalendar(
                      startOfMonth(subMonths(now, 1)),
                      endOfMonth(subMonths(now, 1))
                    )
                  }
                >
                  Last month
                </Dropdown.Item>
              </CustomRangeContainer>
            )}
            <PickRangeLink
              variant="outline-primary"
              block
              href="#"
              onClick={togglePickingRange}
            >
              {isPickingRange ? "Pick a single day" : "Pick a period"}
            </PickRangeLink>
          </ChoiceDropdownMenu>
        </Dropdown>
        <ChoiceButton
          variant="link"
          id="yesterday"
          href="#yesterday"
          onClick={evt => {
            setDateLabel(defaultDateLabel);
            updateTab(evt.target.href.split("#")[1]);
          }}
        >
          Yesterday
        </ChoiceButton>
        <ChoiceButton
          variant="link"
          id="today"
          href="#today"
          onClick={evt => {
            setDateLabel(defaultDateLabel);
            updateTab(evt.target.href.split("#")[1]);
          }}
        >
          Today
        </ChoiceButton>
      </ChoiceBar>
      <ExpenseList className="mt-3">
        {getFilteredExpenses(expenses.data).map(e => (
          <ExpenseItem key={e.guid}>
            <div className="flex-grow-1">
              <div>{e.tag}</div>
              <span style={{ fontSize: "0.875rem" }}>
                {e.note || "No note"}
              </span>
            </div>
            <div className="d-flex align-items-center">
              {numeral(Math.abs(e.value)).format("$0,0.00")}
            </div>
            <div className="ml-3 d-flex align-items-center">
              <span
                className="text-muted mb-0 h3"
                onClick={() => onRemoveExpense(e.guid)}
              >
                &times;
              </span>
            </div>
          </ExpenseItem>
        ))}
        <TotalExpenseItemContainer>
          <TotalExpenseItem>
            <p className="ml-3 mb-0 flex-grow-1">Total</p>
            <p className="mb-0">
              {numeral(
                Math.abs(
                  getFilteredExpenses(expenses.data).reduce(
                    (acc, { value }) => acc + value,
                    0
                  )
                )
              ).format("$0,0.00")}
            </p>
            <TotalAlignmentHelper className="ml-3" />
          </TotalExpenseItem>
        </TotalExpenseItemContainer>
      </ExpenseList>
    </Container>
  );
}

function tabToDate(tab) {
  const d = new Date();
  switch (tab) {
    case "today":
      return { startDate: d, endDate: d };
    case "yesterday":
      d.setDate(d.getDate() - 1);
      return { startDate: d, endDate: d };
    default:
      const startDate = parse(tab.split("_")[0]);
      const endDate =
        tab.split("_").length > 1 ? parse(tab.split("_")[1]) : startDate;
      return {
        startDate,
        endDate
      };
  }
}

const mapStateToProps = state => ({
  expenses: expenses(state)
});

const mapDispatchToProps = dispatch => ({
  onRemoveExpense(guid) {
    dispatch({
      type: "PERFORMED_ACTION",
      action: {
        actionName: "REMOVED_EXPENSE",
        expense: {
          guid
        }
      }
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyTracker);

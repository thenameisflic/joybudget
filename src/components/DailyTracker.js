import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { expenses } from "../store/selectors";
import { connect } from "react-redux";
import numeral from "numeral";
import { areSameDay } from "../utils";

const Container = styled.div`
  padding: 1rem;
  padding-top: 1.5rem;
`;

export const ChoiceBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ChoiceItem = styled.a`
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray);
  text-decoration: none;

  &:target, &.active {
    font-weight: bold;
    color: var(--blue);
  }

  &:focus, &:hover {
    text-decoration: none;
  }
`;

const ExpenseList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ExpenseItem = styled.li`
  display: flex;
  justify-content: space-between;
`;

function DailyTracker({expenses}) {
  const [ activeTab, setActiveTab ] = useState(window.location.hash);

  useEffect(() => {
    if (window.location.hash === "")
      window.location.hash = "#today";
    setActiveTab(window.location.hash.split("#")[1]);
  }, []);

  const updateTab = (tab) => {
    window.location.hash = tab;
    setActiveTab(tab);
  };

  return (
    <Container>
      <h2 className="serif">Tracker</h2>
      <ChoiceBar>
        <ChoiceItem id="more" href="#more" onClick={evt => updateTab(evt.target.href.split("#")[1])}>More</ChoiceItem>
        <ChoiceItem id="twodaysago" href="#twodaysago" onClick={evt => updateTab(evt.target.href.split("#")[1])}>Two days ago</ChoiceItem>
        <ChoiceItem id="yesterday" href="#yesterday" onClick={evt => updateTab(evt.target.href.split("#")[1])}>Yesterday</ChoiceItem>
        <ChoiceItem id="today" href="#today" onClick={evt => updateTab(evt.target.href.split("#")[1])}>Today</ChoiceItem>
      </ChoiceBar>
      <ExpenseList className="mt-3">
        {
          expenses.data.filter((({at}) => areSameDay(tabToDate(activeTab), new Date(at)))).map(e => <ExpenseItem key={e.guid}>
            <div>
              <p className="mb-1">{e.tag} - {numeral(Math.abs(e.value)).format("$0,0.00")}</p>
              <p>{e.note}</p>
            </div>
            <div>
              <h2 className="text-muted"><span>&times;</span></h2>
            </div>
          </ExpenseItem>)
        }
      </ExpenseList>
    </Container>
  );
}

function tabToDate(tab) {
  const d = new Date();
  switch (tab) {
    case "today":
      return d;
    case "yesterday":
      d.setDate(d.getDate() - 1);
      return d;
    case "twodaysago":
      d.setDate(d.getDate() - 2);
      return d;
    default:
      return d;
  }
}

const mapStateToProps = state => ({
  expenses: expenses(state)
});

export default connect(mapStateToProps)(DailyTracker);

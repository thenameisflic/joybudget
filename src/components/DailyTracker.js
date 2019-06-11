import React from "react";
import styled from "styled-components";

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

export default function DailyTracker() {
  return (
    <Container>
      <h2 className="serif">Tracker</h2>
      <ChoiceBar>
        <ChoiceItem id="more" href="#more">More</ChoiceItem>
        <ChoiceItem id="twodaysago" href="#twodaysago">Two days ago</ChoiceItem>
        <ChoiceItem id="yesterday" href="#yesterday">Yesterday</ChoiceItem>
        <ChoiceItem id="today" href="#today">Today</ChoiceItem>
      </ChoiceBar>
      <ExpenseList className="mt-3">
        <ExpenseItem>
          <div>
            <p className="mb-1">Transportation - R$ 52,00</p>
            <p>No note</p>
          </div>
          <div>
            <h2 className="text-muted"><span>&times;</span></h2>
          </div>
        </ExpenseItem>
      </ExpenseList>
    </Container>
  );
}
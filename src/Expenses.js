import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import ExpenseInput from "./ExpenseInput";

const Container = styled.div`
  padding: 1rem;
  padding-top: 1.5rem;
`;

export default function Expenses() {
  const [ otherUtilities, setOtherUtilities ] = useState(false);
  const [ otherBills, setOtherBills ] = useState(false);
  const [ otherOtherExpenses, setOtherOtherExpenses ] = useState(false);

  return (
    <Container>
      <h2 className="serif">Expenses</h2>
      <Form>
        <h5 className="mt-4">Utilities</h5>
        <ExpenseInput title="Phone" name="phone" />
        <ExpenseInput title="Internet" name="internet" />
        <ExpenseInput title="Electricity" name="electric" />
        {otherUtilities && <ExpenseInput title="Others" name="otherUtilities" />}
        <Button className="ml-auto d-block" variant="link" onClick={() => setOtherUtilities(!otherUtilities)}>{otherUtilities ? "Remove" : "Add" } "Others"</Button>
        <h5 className="mt-4">Bills</h5>
        <ExpenseInput title="Rent" name="rent" />
        <ExpenseInput title="Loans" name="loans" />
        <ExpenseInput title="Website" name="website" />
        <ExpenseInput title="Doctor" name="doctor" />
        <ExpenseInput title="Meds" name="meds" />
        {otherBills && <ExpenseInput title="Others" name="otherBills" />}
        <Button className="ml-auto d-block" variant="link" onClick={() => setOtherBills(!otherBills)}>{otherBills ? "Remove" : "Add" } "Others"</Button>
        <h5 className="mt-4">Other Expenses</h5>
        <ExpenseInput title="Pets" name="pets" />
        <ExpenseInput title="Food" name="food" />
        <ExpenseInput title="Lunch / Takeout" name="lunch" />
        <ExpenseInput title="Uber" name="uber" />
        <ExpenseInput title="Subscriptions" name="subscriptions" />
        <ExpenseInput title="Games" name="games" />
        <ExpenseInput title="Exercise" name="exercise" />
        {otherOtherExpenses && <ExpenseInput title="Others" name="otherOtherExpenses" />}
        <Button className="ml-auto d-block" variant="link" onClick={() => setOtherOtherExpenses(!otherOtherExpenses)}>{otherOtherExpenses ? "Remove" : "Add" } "Others"</Button>
      </Form>
    </Container>
  );
}

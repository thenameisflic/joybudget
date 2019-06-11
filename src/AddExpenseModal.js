import React from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import { ChoiceBar, ChoiceItem }  from "./DailyTracker";
import ExpenseInput from "./ExpenseInput";

const ModalContainer = styled(Modal)`
  &.show {
    display: block;
  }
`;

const ModalTitle = styled(Modal.Title)`
  font-size: 1.25rem;
`;

const ModalHeader = styled(Modal.Header)`
  border-bottom: 0;
  padding-bottom: 0;
`;

const ModalFooter = styled(Modal.Footer)`
  border-top: 0;
`;

export default function AddExpenseModal({show, handleClose}) {
  return <ModalContainer show={show} onHide={handleClose}>
  <ModalHeader>
    <ModalTitle className="serif">Add new expense</ModalTitle>
  </ModalHeader>

  <Modal.Body>
    <p className="mb-0">Category</p>
    <ChoiceBar>
      <ChoiceItem href="" className="active" onClick={evt => evt.preventDefault()}>Transportation</ChoiceItem>
      <ChoiceItem href="" onClick={evt => evt.preventDefault()}>Food</ChoiceItem>
      <ChoiceItem href="" onClick={evt => evt.preventDefault()}>Groceries</ChoiceItem>
      <ChoiceItem href="" onClick={evt => evt.preventDefault()}>More</ChoiceItem>
    </ChoiceBar>
    <ExpenseInput title="Cost" name="expense" className="mt-2" />
  </Modal.Body>

  <ModalFooter>
    <Button bsStyle="primary" className="d-block flex-grow-1">Save changes</Button>
  </ModalFooter>
</ModalContainer>
}

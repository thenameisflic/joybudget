import React from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import { ChoiceBar, ChoiceItem }  from "./DailyTracker";
import ExpenseInput from "./ExpenseInput";

const ModalContainer = styled(Modal)`
  &.show {
    display: block;
  }

  .modal-dialog {
    display: flex;
    align-items: flex-end;
    min-height: 100%;
    margin: 0 auto;
  }

  &.fade .modal-dialog {
    transform: translate(0, 100px);
  }

  &.show .modal-dialog {
    transform: none;
  }

  .modal-content {
    border-radius: 40px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: none;
  }
`;

const ModalTitle = styled(Modal.Title)`
  font-size: 1.25rem;
`;

const ModalBody = styled(Modal.Body)`
  padding-left: 2rem;
  padding-right: 2rem;
`;

const ModalHeader = styled(Modal.Header)`
  border-bottom: 0;
  padding: 2rem;
  padding-bottom: 0;
`;

const ModalFooter = styled(Modal.Footer)`
  border-top: 0;
  padding-left: 2rem;
  padding-right: 2rem;
`;

export default function AddExpenseModal({show, onHide}) {
  return <ModalContainer show={show} onHide={onHide}>
  <ModalHeader closeButton>
    <ModalTitle className="serif">Add new expense</ModalTitle>
  </ModalHeader>

  <ModalBody>
    <p className="mb-0">Category</p>
    <ChoiceBar>
      <ChoiceItem href="" className="active" onClick={evt => evt.preventDefault()}>Transportation</ChoiceItem>
      <ChoiceItem href="" onClick={evt => evt.preventDefault()}>Food</ChoiceItem>
      <ChoiceItem href="" onClick={evt => evt.preventDefault()}>Groceries</ChoiceItem>
      <ChoiceItem href="" onClick={evt => evt.preventDefault()}>More</ChoiceItem>
    </ChoiceBar>
    <ExpenseInput title="Cost" name="expense" className="mt-2" />
  </ModalBody>

  <ModalFooter>
    <Button className="d-block flex-grow-1">Save changes</Button>
  </ModalFooter>
</ModalContainer>
}

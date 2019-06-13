import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import styled from "styled-components";
import { ChoiceBar, ChoiceButton } from "./DailyTracker";
import ExpenseInput from "./ExpenseInput";
import uuid from "uuid/v4";

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

function AddExpenseModal({ show, onHide, onCreateExpense }) {
  const [value, setValue] = useState(0);
  const [tag, setTag] = useState("Transportation");
  const [note] = useState("");

  const updateTag = evt => {
    evt.preventDefault();
    setTag(evt.target.innerText);
  };

  return (
    <ModalContainer show={show} onHide={onHide}>
      <ModalHeader closeButton>
        <ModalTitle className="serif">Add new expense</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <p className="mb-0">Category</p>
        <ChoiceBar>
          <ChoiceButton
            href=""
            className={tag === "Transportation" && "active"}
            onClick={updateTag}
            variant="link"
          >
            Transportation
          </ChoiceButton>
          <ChoiceButton
            href=""
            className={tag === "Food" && "active"}
            onClick={updateTag}
            variant="link"
          >
            Food
          </ChoiceButton>
          <ChoiceButton
            href=""
            className={tag === "Groceries" && "active"}
            onClick={updateTag}
            variant="link"
          >
            Groceries
          </ChoiceButton>
        </ChoiceBar>
        <ExpenseInput
          title="Cost"
          name="expense"
          className="mt-2"
          onUpdateExpense={newValue => setValue(newValue)}
          initialValue={value}
        />
      </ModalBody>

      <ModalFooter>
        <Button
          className="d-block flex-grow-1"
          onClick={() => {
            onCreateExpense({ value, tag, at: new Date().toISOString(), note });
            onHide();
          }}
        >
          Save changes
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
}

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  onCreateExpense({ value, tag, at, note }) {
    dispatch({
      type: "PERFORMED_ACTION",
      action: {
        actionName: "CREATED_EXPENSE",
        expense: {
        guid: uuid(),
        value,
        tag,
        at,
        note
      }
      }
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExpenseModal);

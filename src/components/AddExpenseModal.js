import React, { useState } from "react";
import { Button, Modal, Dropdown, Form } from "react-bootstrap";
import { connect } from "react-redux";
import styled from "styled-components";
import { ChoiceBar, ChoiceButton, ChoiceDropdownToggle } from "./DailyTracker";
import ExpenseInput from "./ExpenseInput";
import uuid from "uuid/v4";
import { format } from "date-fns";
import { latestTags, expenseValueSuggestions, noteSuggestions } from "../store/selectors";
import { sorted, unique } from "../utils";
import numeral from "numeral";

export const ModalContainer = styled(Modal)`
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

export const ModalTitle = styled(Modal.Title)`
  font-size: 1.25rem;
`;

export const ModalBody = styled(Modal.Body)`
  padding-left: 2rem;
  padding-right: 2rem;
`;

export const ModalHeader = styled(Modal.Header)`
  border-bottom: 0;
  padding: 2rem;
  padding-bottom: 0;
`;

export const ModalFooter = styled(Modal.Footer)`
  border-top: 0;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const ScrollableChoiceBar = styled(ChoiceBar)`
  overflow-x: scroll;
  width: 100%;
`;

const TagSelectionBar = styled.div`
  display: flex;
  position: relative;
`;

const FixedChoiceButton = styled(ChoiceDropdownToggle)`
  background: linear-gradient(
    to right,
    transparent 1%,
    var(--light) 15%,
    var(--light) 25%
  );
  border: none;
  position: absolute;
  right: 0;
  padding-left: 2rem;
  padding-right: 1rem;
`;

const ValueSuggestion = styled(Button)`
  &.active {
    font-weight: bold;
  }

  &:focus, &:hover {
    text-decoration: none;
  }
`;

function AddExpenseModal({
  show,
  onHide,
  onCreateExpense,
  tags,
  expenseValueSuggestions,
  noteSuggestions
}) {
  const tagSuggestionsLength = 2;
  const expenseValueSuggestionsLength = 3;
  const maxNoteSuggestions = 3;
  const defaultDropdownLabel = "More";
  const [value, setValue] = useState(0);
  const [tag, setTag] = useState(tags[0]);
  const [dropdownLabel, setDropdownLabel] = useState(defaultDropdownLabel);
  const [isNoteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState("");
  const [isTagPickerOpen, setTagPickerOpen] = useState(false);

  const updateTag = tag => {
    setTag(tag);
    if (getSuggestions(tags).includes(tag))
      setDropdownLabel(defaultDropdownLabel);
  };

  const getSuggestions = tags => {
    let suggestions = tags.slice(0, tagSuggestionsLength);
    return suggestions;
  };

  const updateDropdownLabel = tag => {
    setDropdownLabel(tag);
    updateTag(tag);
  };

  const toggleNote = () => {
    if (!isNoteOpen) {
      setTimeout(() => {
        document.querySelector(".modal").scrollTo(0, 999999);
      }, 200);
    }
    setNoteOpen(!isNoteOpen);
  };

  const getExpenseValueSuggestions = tag => {
    const defaultSuggestions = [1, 5, 10];
    let suggestions = expenseValueSuggestions[tag] || [];
    if (suggestions.length < expenseValueSuggestionsLength) {
      suggestions = [
        ...suggestions,
        ...defaultSuggestions.slice(
          0,
          expenseValueSuggestionsLength - suggestions.length
        )
      ];
    }
    suggestions = suggestions
      .slice(0, expenseValueSuggestionsLength)
      .map(v => Math.abs(v));
    return unique(suggestions);
  };

  const getNoteSuggestions = tag => {
    return (noteSuggestions[tag] || []).slice(0, maxNoteSuggestions);
  };

  return (
    <ModalContainer show={show} onHide={onHide}>
      <ModalHeader closeButton>
        <ModalTitle className="serif">Add new expense</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <p className="mb-0">Category</p>
        <TagSelectionBar>
          <ScrollableChoiceBar>
            {getSuggestions(tags).map((t, idx) => (
              <ChoiceButton
                key={idx}
                className={tag === t && "active"}
                style={{
                  paddingRight: idx === tagSuggestionsLength - 1 && "8rem"
                }}
                onClick={() => updateTag(t)}
                variant="link"
              >
                {t}
              </ChoiceButton>
            ))}
          </ScrollableChoiceBar>
          <Dropdown
            show={isTagPickerOpen}
            onToggle={() => setTagPickerOpen(!isTagPickerOpen)}
          >
            <FixedChoiceButton
              variant="link"
              className={(isTagPickerOpen || tag === dropdownLabel) && "active"}
            >
              {dropdownLabel}
            </FixedChoiceButton>
            <Dropdown.Menu>
              {sorted(tags).map((t, idx) => (
                <Dropdown.Item key={idx} onClick={() => updateDropdownLabel(t)}>
                  {t}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </TagSelectionBar>
        <ExpenseInput
          renderLabel={() => (
            <Form.Label className="d-flex">
              <span>Cost</span>
              <div className="ml-auto">
                {getExpenseValueSuggestions(tag).map((v, idx) => (
                  <ValueSuggestion
                    key={idx}
                    size="sm"
                    variant="link"
                    className={`ml-1 ${v === value && "active"}`}
                    href="#"
                    onClick={e => {e.preventDefault(); setValue(-v);}}
                  >
                    {numeral(v).format("$0,0.00")}
                  </ValueSuggestion>
                ))}
              </div>
            </Form.Label>
          )}
          name="expense"
          className="mt-2"
          onUpdateExpense={newValue => {
            setValue(newValue);
          }}
          initialValue={value}
        />
        {isNoteOpen && (
          <>
            <Form.Group controlId="expenseNote" className="mb-1">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                autoFocus
                onChange={evt => setNote(evt.target.value)}
                value={note}
              />
            </Form.Group>
            <div>
              {
                getNoteSuggestions(tag).map((v, idx) => <div key={idx}>
                  <Button variant={v === note ? "primary" : "link"} block onClick={() => setNote(v)}>{v}</Button>
                </div>)
              }
            </div>
          </>
        )}
      </ModalBody>

      <ModalFooter>
        <Button
          variant="outline-primary"
          className="d-block flex-grow-1"
          onClick={toggleNote}
        >
          {isNoteOpen ? "Remove note" : "Add note"}
        </Button>
        <Button
          className="d-block flex-grow-1"
          onClick={() => {
            onCreateExpense({
              value,
              tag,
              at: format(new Date(), "YYYY-MM-DD HH:mm"),
              note
            });
            setNote('');
            setValue(0);
            setDropdownLabel(defaultDropdownLabel);
            onHide();
          }}
        >
          Save changes
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
}

const mapStateToProps = state => ({
  tags: latestTags(state),
  expenseValueSuggestions: expenseValueSuggestions(state),
  noteSuggestions: noteSuggestions(state)
});

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

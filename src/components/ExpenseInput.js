import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Form, InputGroup } from "react-bootstrap";
import numeral from "numeral";
import { useTranslation } from "react-i18next";

const InputGroupText = styled(InputGroup.Text)`
  background: none;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

const FormControl = styled(Form.Control)`
  border-right-width: 0;
  border-top-width: 0;
  border-left-width: 0;
`;

export default function ExpenseInput({title, renderLabel, name, className, initialValue, onUpdateExpense, isIncome, onFocus}) {
  const { t } = useTranslation();
  const [ value, setValue ] = useState(format(initialValue));
  const [ oldValue, setOldValue ] = useState(format(initialValue));
  const inputRef = useRef(null);

  useEffect(() => {
    document.querySelector(`#${name}Input`).blur();
  }, [name]);

  useEffect(() => {
    setValue(format(initialValue));
  }, [initialValue]);

  return <Form.Group className={className}>
    {renderLabel ? renderLabel() : <Form.Label>{title}</Form.Label>}
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroupText id={name + "inputGroupPrepend"}>{t("currencySign")}</InputGroupText>
      </InputGroup.Prepend>
      <FormControl
        placeholder={numeral(0).format("0,0.00")}
        value={format(value)}
        ref={inputRef}
        type="tel"
        onClick={evt => {
          evt.target.setSelectionRange(0, evt.target.value.length);
        }}
        onChange={evt => {
          // if the user deleted a major cent, put the cursor back in the right place
          const newValue = format(evt.target.value);
          setValue(newValue);
        }}
        onBlur={evt => {
          if (oldValue !== value) {
            onUpdateExpense(parseFloat(value) * (isIncome ? 1 : -1), parseFloat(oldValue) * (isIncome ? 1 : -1));
            setOldValue(value);
          }
        }}
        onFocus={onFocus}
        aria-describedby={name + "inputGroupPrepend"}
        id={name + "Input"}
      />
    </InputGroup>
  </Form.Group>;
}

function format(v) {
  if (typeof v === "number") {
    v = String(v);
    if (!v.includes("."))
      v = v + ".00";
    else if (v.split(".")[1].length === 1)
      v = v + "0";
  }
  v = String(parseFloat(v.replace(/\D/g,'')));
  if (v.length < 3)
    v = v.padStart(3, '0');
  return v.slice(0, v.length - 2) + '.' + v.slice(v.length - 2, v.length);
}

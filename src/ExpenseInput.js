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

export default function ExpenseInput({title, name, className}) {
  const { t } = useTranslation();
  const [ value, setValue ] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    document.querySelector(`#${name}Input`).blur();
  }, [name]);

  return <Form.Group className={className}>
    <Form.Label>{title}</Form.Label>
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroupText id={name + "inputGroupPrepend"}>{t("currencySign")}</InputGroupText>
      </InputGroup.Prepend>
      <FormControl
        placeholder={numeral(0).format("0,0.00")}
        value={value}
        ref={inputRef}
        type="tel"
        onChange={evt => {
          // if the user deleted a major cent, put the cursor back in the right place
          let v = String(parseInt(evt.target.value.replace(/\D/g,'')));
          if (v.length < 3)
            v = v.padStart(3, '0');
          const out = v.slice(0, v.length - 2) + '.' + v.slice(v.length - 2, v.length);
          setValue(out);
        }}
        aria-describedby={name + "inputGroupPrepend"}
        id={name + "Input"}
      />
    </InputGroup>
  </Form.Group>;
}

import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form } from "react-bootstrap";
import {
  ModalContainer,
  ModalBody,
  ModalHeader,
  ModalTitle
} from "./AddExpenseModal";
import { ReactComponent as cogIcon } from "typicons.font/src/svg/cog.svg";
import { expenses, recurringExpenses } from "../store/selectors";
import { exportCsv } from "../utils/export";
import { connect } from "react-redux";
import i18next from "i18next";
import numeral from "numeral";

function Settings({ expenses, variant = "primary" }) {
  const [isOpen, setOpen] = useState(false);
  const [isExporting, setExporting] = useState(false);
  const [isClearingData, setClearingData] = useState(false);

  const onExport = async () => {
    setExporting(true);
    await exportCsv(expenses.data);
    setExporting(false);
  };

  const onClearDataConfirmation = async () => {
    setClearingData(true);
  };

  const onClearData = async () => {
    alert("All your local data is gone. Redirecting you to the home page.");
    localStorage.clear();
    window.location.reload();
  }

  const language = i18next.language.toLowerCase();
  console.log(numeral.locales);

  return (
    <>
      <Button variant={variant} onClick={() => setOpen(true)}>
        <SettingsIcon />
      </Button>
      <ModalContainer show={isOpen} onHide={() => setOpen(false)}>
        <ModalHeader closeButton>
          <ModalTitle className="serif">Settings</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {!isClearingData && (
            <>
              <Form.Group controlId="changeLanguageSelect">
                <Form.Label>Currency</Form.Label>
                <Form.Control as="select" value={language} onChange={evt => {
                  var params = [
                    "lng=" + evt.target.value
                  ];
                  
                window.location.href =
                    "http://" +
                    window.location.host +
                    window.location.pathname +
                    '?' + params.join('&');
                }}>
                  {Object.entries(numeral.locales).map(([key, locale]) => <option key={key} value={key}>{locale.currency.symbol} ({key})</option>)}
                </Form.Control>
              </Form.Group>
              <Button
                variant="link"
                className="pl-0 d-block"
                onClick={onExport}
                disabled={isExporting}
              >
                {isExporting ? "Exporting your data..." : "Export all as CSV"}
              </Button>
              <Button
                variant="link"
                className="pl-0 d-block text-left"
                href="mailto:fsfelicianosantana@gmail.com"
              >
                Contact the developer
              </Button>
              <Button
                variant="link"
                className="pl-0 mt-2 text-danger"
                onClick={onClearDataConfirmation}
              >
                Clear data
              </Button>
            </>
          )}
          {isClearingData && (
            <>
              <p>
                Are you sure you want to delete all your data? Remember: all
                your info is stored only on this device, and if you procceed,
                you won't be able to recover it.
              </p>
              <Button variant="danger" block onClick={() => onClearData()}>Yes, remove all my data</Button>
              <Button variant="link" className="mt-2" block onClick={() => setClearingData(false)}>No, cancel</Button>
            </>
          )}
        </ModalBody>
      </ModalContainer>
    </>
  );
}

const SettingsIcon = styled(cogIcon)`
  fill: #fff;
`;

const mapStateToProps = state => ({
  expenses: expenses(state),
  recurringExpenses: recurringExpenses(state)
});

export default connect(mapStateToProps)(Settings);

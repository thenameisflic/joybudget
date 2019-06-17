import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
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

function Settings({ expenses }) {
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
    alert("All your local data was cleared. Taking you back to the home page.");
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <SettingsIcon />
      </Button>
      <ModalContainer show={isOpen} onHide={() => setOpen(false)}>
        <ModalHeader closeButton>
          <ModalTitle className="serif">Settings</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {!isClearingData && (
            <>
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

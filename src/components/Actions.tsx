import { Button, Col, Row } from "antd";
import { FunctionComponent, useContext } from "react";
import { AppContext } from "../AppContext";
import { saveAs } from "file-saver";

export const Actions: FunctionComponent = () => {
  const { wrappedDocument, setCurrentStep, currentStep, setIssued } =
    useContext(AppContext);

  const download = () => {
    const blob = new Blob([JSON.stringify(wrappedDocument)], {
      type: "text/json;charset=utf-8",
    });
    saveAs(blob, `SIMPLE_COO_DOCUMENT.tt`);
  };

  const onCreateAnother = () => {
    setCurrentStep(currentStep - 1);
    setIssued(false);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col>
          <Button type="primary" onClick={download}>
            Download
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            ghost
            target="_blank"
            rel="noreferrer"
            href="https://dev.tradetrust.io/verify"
          >
            Verify
          </Button>
        </Col>
        <Col>
          <Button onClick={onCreateAnother}>Create Another</Button>
        </Col>
      </Row>
    </div>
  );
};

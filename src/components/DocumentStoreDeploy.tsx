import { Button, Col, message, Row } from "antd";
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { deployDocumentStore } from "../services";

export const DocumentStoreDeploy = () => {
  const {
    signer,
    documentStoreAddress,
    setDocumentStoreAddress,
    setCurrentStep,
    currentStep,
  } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const documentStoreAddress = await deployDocumentStore(signer!);
      setLoading(false);
      setDocumentStoreAddress(documentStoreAddress);
      message.success("Document store successfully deployed");
    } catch (e: any) {
      setLoading(false);
      message.error(e.message);
    }
  };

  return (
    <div>
      {documentStoreAddress ? (
        <p>Document store deployed at {documentStoreAddress}</p>
      ) : (
        <p>No document store deployed</p>
      )}
      <Row gutter={12}>
        <Col>
          <Button
            disabled={!signer}
            loading={loading}
            type={documentStoreAddress ? "default" : "primary"}
            onClick={onClick}
          >
            Deploy
          </Button>
        </Col>
        {documentStoreAddress && (
          <Col>
            <Button
              type="primary"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
};

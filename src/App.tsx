import { JsonRpcSigner } from "@ethersproject/providers";
import { WrappedDocument } from "@govtechsg/open-attestation/dist/types/2.0/types";
import { Card, Col, Row, Steps } from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import { AppContext } from "./AppContext";
import { initializeMetaMask } from "./services";

import {
  CheckCircleOutlined,
  ShopOutlined,
  CloudServerOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { DocumentStoreDeploy } from "./components/DocumentStoreDeploy";
import { DnsConfig } from "./components/DnsConfig";
import { DocumentForm } from "./components/DocumentForm";
import { Actions } from "./components/Actions";

const { Step } = Steps;

function App() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [wrappedDocument, setWrappedDocument] = useState<WrappedDocument>();
  const [documentStoreAddress, setDocumentStoreAddress] = useState<string>();
  const [dns, setDns] = useState<string>();
  const [issued, setIssued] = useState<boolean>();

  useEffect(() => {
    const init = async () => {
      const signer = await initializeMetaMask();
      setSigner(signer);
      setDocumentStoreAddress("0x745fA220986146046EdAee4932cb7f84446635D9");
    };

    init();
  }, []);

  const steps = [
    {
      title: "Deploy Document Store",
      component: <DocumentStoreDeploy />,
      icon: <ShopOutlined />,
      clickable: documentStoreAddress !== undefined,
    },
    {
      title: "Domain Name Configuration",
      component: <DnsConfig />,
      icon: <CloudServerOutlined />,
      clickable: dns !== undefined,
    },
    {
      title: "Document Form",
      component: <DocumentForm />,
      icon: <FormOutlined />,
      clickable: issued,
    },
    {
      title: "Download & Verify",
      component: <Actions />,
      icon: <CheckCircleOutlined />,
      clickable: issued,
    },
  ];

  return (
    <AppContext.Provider
      value={{
        signer,
        wrappedDocument,
        setWrappedDocument,
        documentStoreAddress,
        setDocumentStoreAddress,
        dns,
        setDns,
        issued,
        setIssued,
        currentStep,
        setCurrentStep,
      }}
    >
      <Row style={{ height: "100vh" }} justify="center" align="middle">
        <Row
          gutter={24}
          style={{
            width: 1000,
            minHeight: 400,
            margin: "auto",
          }}
        >
          <Col span={18}>
            <Card
              title={`${currentStep + 1}. ${steps[currentStep].title}`}
              style={{ height: "100%" }}
            >
              {steps[currentStep].component}
            </Card>
          </Col>
          <Col span={6}>
            <Steps
              direction="vertical"
              style={{ marginBottom: 24, height: "100%" }}
              current={currentStep}
            >
              {steps.map((step) => (
                <Step
                  key={step.title}
                  disabled={!step.clickable}
                  title={step.title}
                  icon={step.icon}
                  onStepClick={
                    step.clickable
                      ? (nextStep) => setCurrentStep(nextStep)
                      : undefined
                  }
                />
              ))}
            </Steps>
          </Col>
        </Row>
      </Row>
    </AppContext.Provider>
  );
}

export default App;

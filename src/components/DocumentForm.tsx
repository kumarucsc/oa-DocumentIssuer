import { Form, Input, Button, Row, message, Col } from "antd";
import { FunctionComponent, useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { getRawDocument, getWrappedDocument, issueDocument } from "../services";

export const DocumentForm: FunctionComponent = () => {
  const [form] = Form.useForm();

  const {
    signer,
    documentStoreAddress,
    dns,
    issued,
    setIssued,
    setCurrentStep,
    currentStep,
    setWrappedDocument,
  } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (formValues: any) => {
    try {
      setLoading(true);
      const rawDocument = getRawDocument({
        formValues,
        documentStoreAddress: documentStoreAddress!,
        dns: dns!,
      });

      const wrappedDocument = getWrappedDocument(rawDocument);
      setWrappedDocument(wrappedDocument);
      await issueDocument({
        wrappedDocument,
        signer: signer!,
        documentStoreAddress: documentStoreAddress!,
      });
      setIssued(true);
      setLoading(false);
      message.success("Document successsfully issued");
    } catch (e: any) {
      setLoading(false);
      message.error(e.message);
    }
  };

  const labelCol = { span: 24 };

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item
        labelCol={labelCol}
        name="documentName"
        label="Document Name"
        initialValue="Form for Free Trade Agreement"
      >
        <Input />
      </Form.Item>

      <Form.Item
        labelCol={labelCol}
        name="issueDateAndTime"
        label="Issued Date &amp; Time"
        initialValue="21 September 2021, 3:05pm"
      >
        <Input />
      </Form.Item>

      <Form.Item
        labelCol={labelCol}
        name="issueIn"
        label="Issued In"
        initialValue="Singapore"
      >
        <Input />
      </Form.Item>

      <Form.Item
        labelCol={labelCol}
        name="cooId"
        label="Coo Id"
        initialValue="123456"
      >
        <Input />
      </Form.Item>

      <Form.Item labelCol={labelCol}>
        <Row gutter={12}>
          <Col>
            <Button
              loading={loading}
              type={issued ? "default" : "primary"}
              htmlType="submit"
            >
              Submit
            </Button>
          </Col>
          {issued && (
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
      </Form.Item>
    </Form>
  );
};

export default DocumentForm;

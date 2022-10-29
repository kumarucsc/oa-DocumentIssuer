import { JsonRpcSigner } from "@ethersproject/providers";
import { DocumentStoreFactory } from "@govtechsg/document-store";
import { wrapDocument } from "@govtechsg/open-attestation";
import { WrappedDocument } from "@govtechsg/open-attestation/dist/types/2.0/types";
import { ethers } from "ethers";

export const initializeMetaMask = async () => {
  const { ethereum } = window as any;

  await ethereum.enable();
  const web3provider = new ethers.providers.Web3Provider(ethereum);
  const signer: JsonRpcSigner = web3provider.getSigner();
  return signer;
};

export const deployDocumentStore = async (signer: JsonRpcSigner) => {
  const factory = new DocumentStoreFactory(signer);
  const documentStore = await factory.deploy("DEMO_DOCUMENT_STORE");
  await documentStore.deployTransaction.wait();
  return documentStore.address;
};

export const getRawDocument = ({
  formValues,
  documentStoreAddress,
  dns,
}: {
  formValues: Record<string, any>;
  documentStoreAddress: string;
  dns: string;
}) => {
  return {
    $template: {
      name: "SIMPLE_COO",
      type: "EMBEDDED_RENDERER",
      url: "https://generic-templates.tradetrust.io",
    },
    issuers: [
      {
        name: "Demo Issuer",
        documentStore: documentStoreAddress,
        identityProof: {
          type: "DNS-TXT",
          location: dns,
        },
      },
    ],
    ...formValues,
  };
};

export const getWrappedDocument = (rawDocument: any) => {
  const wrappedDocument = wrapDocument(rawDocument);
  return wrappedDocument;
};

export const issueDocument = async ({
  wrappedDocument,
  documentStoreAddress,
  signer,
}: {
  wrappedDocument: WrappedDocument;
  documentStoreAddress: string;
  signer: JsonRpcSigner;
}) => {
  const {
    signature: { targetHash },
  } = wrappedDocument;
  const documentStore = DocumentStoreFactory.connect(
    documentStoreAddress,
    signer
  );
  const receipt = await documentStore.issue(`0x${targetHash}`);
  await receipt.wait();
};

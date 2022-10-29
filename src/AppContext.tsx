import { WrappedDocument } from "@govtechsg/open-attestation/dist/types/2.0/types";
import { JsonRpcSigner } from "@ethersproject/providers";
import { createContext } from "react";

interface IAppContext {
  signer?: JsonRpcSigner;
  documentStoreAddress?: string;
  setDocumentStoreAddress: (documentStoreAddress: string) => void;
  dns?: string;
  setDns: (dns: string) => void;
  wrappedDocument?: WrappedDocument;
  setWrappedDocument: (wrappedDocument: WrappedDocument) => void;
  issued?: boolean;
  setIssued: (issued: boolean) => void;
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
}

export const AppContext = createContext<IAppContext>({
  currentStep: 0,
  setCurrentStep: () => null,
  setDocumentStoreAddress: () => null,
  setDns: () => null,
  setWrappedDocument: () => null,
  setIssued: () => null,
});

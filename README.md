# Steps
1. Deploy Document Store  
2. Domain Name Configuration  
3. Configure Document FORM  
4. Download and Verify  
# Reference
Link: https://www.openattestation.com/docs/developer-section/quickstart/create-verifiable-document-issuer  
Github: https://github.com/waynewee/verifiable-document-issuer-demo  

# How to run
To Install : npm i -s    
To run: npm run dev 

# To run with new DocStore
Comment below line in App.tsx  
setDocumentStoreAddress("0x745fA220986146046EdAee4932cb7f84446635D9");  

# To run with old DocStore
Old Docstore: 0x745fA220986146046EdAee4932cb7f84446635D9

# Domain Name DNS Configuration
Run below command  by changing Docstore  
open-attestation dns txt-record create --address 0x745fA220986146046EdAee4932cb7f84446635D9 --network-id 5  
goerli network id: 5  
Sample domain name: colossal-lime-bedbug.sandbox.openattestation.com





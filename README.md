## Purpose
This web application was created for the ULedger Blockchain Hackathon and is used to store medical records on the ULedger blockchain.

## About
This web application was built as a full-stack application used in conjunction with the ULedger Blockchain as a database to create, read, update and delete data held in blockchain transactions running on a public ULedger blockchain. The data in the application deals with medical records. The medical records consist of a person's data that includes Name, Age, Date of Birth, Weight, Height, Vaccination Status, Doctor and Health Card Number. 

The web application has two portals. The health care provider portal provides access to all options to manipulate data on the blockchain which includes create, read, update and delete features. Additionally, a search feature that allows the health care provider to query the blockchain for all transactions or a specific transaction associated to its facility is also present. The patient portal provides access to a read only feature in order to access their medical data for auditing purposes.

The application was built to provide a decentralized way of storing medical records for people. By doing so, it solves the issue of a single point of failure when it comes to how medical records are usually stored in our world today in a centralized database that is prone to security issues. These issues may include a hacker gaining access to the centralized medical database and maliciously manipulating the data. By storing sensitive data such as medical records it solves the issue of a single point of failure. The data is also transparent yet protected by ULedger's blockchain technology.

## Getting Started
1. Fork and clone this repository to your local machine.
2. Navigate to the project root folder.
3. Install dependencies with `npm install`.
4. Create a .env file with the following parameters and input their values into the quotations:
    ```
    NODE_URL=""
    ATOMIC_CLOCK_URL=""
    NODE_ID=""
    BLOCKCHAIN_ID=""
    ```
5. Run the development server with `npm run dev`.
6. Navigate to [http://localhost:3000](http://localhost:3000) in a browser to run the web aplication.

## Languages
- JavaScript
- TypeScript

## Dependencies
- NodeJS
- NextJS
- ReactJS
- TailwindCSS
- Axios
- jspdf
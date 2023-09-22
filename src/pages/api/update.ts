import { NextApiRequest, NextApiResponse } from 'next';
const { ULedgerBMSSession, ULedgerTransactionV2, ULedgerTransactionSessionV2 } = require("@uledger/uledger-sdk");
import crypto from 'crypto'

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    },  
});

async function update() {

    const session = new ULedgerBMSSession({
      url: "https://uledger.net/api/v1/bms"
    });

    // Search terms 
    const blockchainId = process.env.NODE_URL;
    const transactionId = "1df554c002488dec1e5e1683b4def8989e99f568d320b0f7b5f3abee934ff1ad";
    const trim = false;

    const bmsTxn = await session.searchTransactionById(transactionId, trim);
    console.log("Retreived transaction by ID:\n", bmsTxn);
    
    const toAddress = bmsTxn.toAddress;
    console.log("\nTo address: ", toAddress);

}

update();
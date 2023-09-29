// Imports
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

// API request from blockchain
export default async function deleteUser(req: NextApiRequest, res:NextApiResponse) {

    const session = new ULedgerBMSSession({
      url: "https://uledger.net/api/v1/bms"
    });

    const searchTxnId = req.body.transactionId;

    // Search terms 
    const blockchainId = process.env.NODE_URL;
    
    
    const trim = false;

    const bmsTxn = await session.searchTransactionById(searchTxnId, trim);
    //console.log("Retreived transaction by ID:\n", bmsTxn);
    
    const bmsTxnPayload = eval('(' + bmsTxn.payload + ')');
    const patientId = bmsTxnPayload.patientId;

    const payload = {
      patientId: patientId,
      status: "inactive",
    };
   
    const my_address = sha256Hash(publicKey);

    // New blockchain transaction
    try {
        const txnSession = new ULedgerTransactionSessionV2({
            nodeUrl: process.env.NODE_URL,
            atomicClockUrl: process.env.ATOMIC_CLOCK_URL,
            nodeId: process.env.NODE_ID
        });

        const txnInputData: ULedgerTransactionInputV2 = {
            blockchainId: process.env.BLOCKCHAIN_ID,
            to: 'smartContractPublicAddress',
            from: '6c39bc0c2483a4b5b01bd02c13624c114efc5336fe55c32b8e54a5b35664cb79',
            payload: payload,
            payloadType: "DATA",
            senderSignature: "UPDATE THIS AFTER SIGNING AND BEFORE UPLOADING"
        };

        const inputString = JSON.stringify(txnInputData.payload);
        const hash = sha256Hash(inputString);
        console.log('Keccak (SHA-3) Hash of Transaction Payload:', hash);
  
        const sign = crypto.createSign('RSA-SHA256');
        sign.update(hash);
        const signature = sign.sign(privateKey, 'base64');
        txnInputData.senderSignature = sha256Hash(signature);
  
        const txn = await txnSession.createTransaction(txnInputData);
        const txnInfo = {
          transaction_id: txn.transaction_id,
          patientId: patientId,
          status: "inactive",
        };

        res.status(200).json({ txnInfo });
    } catch (error) {
        res.status(500).json({ error });
        console.error("Fail ", error);
    }
    
};

function sha256Hash(data: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}
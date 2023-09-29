// Impors
import { NextApiRequest, NextApiResponse } from 'next';
const { ULedgerBMSSession, ULedgerTransactionV2, ULedgerTransactionSessionV2 } = require("@uledger/uledger-sdk");
import crypto from 'crypto'

// Generate private key
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

// Blockchain treansaction
export default async function deleteUser(req: NextApiRequest, res:NextApiResponse) {

    const session = new ULedgerBMSSession({
      url: "https://uledger.net/api/v1/bms"
    });

    const searchTxnId = req.body.transactionId;

    // Search terms 
    const blockchainId = process.env.NODE_URL;
    const trim = false;

    // Obtain patient ID from prior transaction
    const bmsTxn = await session.searchTransactionById(searchTxnId, trim);    
    const bmsTxnPayload = eval('(' + bmsTxn.payload + ')');
    const patientId = bmsTxnPayload.patientId;

    const payload = {
      patientId: eval('(' + patientId + ')'),
      status: "inactive",
    };
   
    // Create new blockchain transaction
    try {
        const txnSession = new ULedgerTransactionSessionV2({
            nodeUrl: process.env.NODE_URL,
            atomicClockUrl: process.env.ATOMIC_CLOCK_URL,
            nodeId: process.env.NODE_ID
        });

        const txnInputData: ULedgerTransactionInputV2 = {
            blockchainId: process.env.BLOCKCHAIN_ID,
            to: 'smartContractPublicAddress',
            from: '5feb4dd3326c53b1354749033297a506d9ef4652b89b17e2d7f0f6d0a794bb7e',
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

// Create hash
function sha256Hash(data: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}
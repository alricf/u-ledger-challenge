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

export default async function update(req: NextApiRequest, res:NextApiResponse) {

    const session = new ULedgerBMSSession({
      url: "https://uledger.net/api/v1/bms"
    });

    //get transaction from body
    const searchTxnId = req.body.transactionId;
    
    let payload = req.body;
    delete payload.transactionId;

    // Search terms 
    const blockchainId = process.env.NODE_URL;
    const trim = false;

    //transaction by id and obtain patient id for new payload
    const bmsTxn = await session.searchTransactionById(searchTxnId, trim);
    const bmsTxnPayload = eval('(' + bmsTxn.payload + ')');
    const patientId = bmsTxnPayload.patientId;

    payload.patientId = patientId;

    const my_address = sha256Hash(publicKey);

    try {
        const txnSession = new ULedgerTransactionSessionV2({
            nodeUrl: process.env.NODE_URL,
            atomicClockUrl: process.env.ATOMIC_CLOCK_URL,
            nodeId: process.env.NODE_ID
        });

        const txnInputData: ULedgerTransactionInputV2 = {
            blockchainId: process.env.BLOCKCHAIN_ID,
            to: 'smartContractPublicAddress',
            from: 'c85458e3eeb0f6f1013d389635e931ff90457dbaf53cc4495b20e79d8d903905',
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

        res.status(200).json({ txn });
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
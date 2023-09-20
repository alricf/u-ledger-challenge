import { NextApiRequest, NextApiResponse } from 'next';
const { ULedgerTransactionInputV2, ULedgerTransactionSessionV2, ULedgerBMSSession } = require('@uledger/uledger-sdk');
import crypto from 'crypto';

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

export default async function updateTransactionHandler(req: NextApiRequest, res: NextApiResponse) {

    const session = new ULedgerBMSSession({
        url: "https://uledger.net/api/v1/bms"
    });  
    
    const trim = false;

    const transactionId = "1df554c002488dec1e5e1683b4def8989e99f568d320b0f7b5f3abee934ff1ad";
  
    const bmsTxn = await session.searchTransactionById(transactionId, trim);
    const JSpayload = eval('(' + bmsTxn.payload + ')');
    
    console.log("JSpayload: ", JSpayload); 
  
    // JSpayload[key] = val;
  
    console.log("\nupdated payload: ", JSpayload, "\ntypeof JSpayload: ", (typeof JSpayload));
    

    const my_address = sha256Hash(publicKey);

    try {
        const txnSession = new ULedgerTransactionSessionV2({
        nodeUrl: process.env.NODE_URL,
        atomicClockUrl: process.env.ATOMIC_CLOCK_URL,
        nodeId: process.env.NODE_ID
        });

        const txnInputData: ULedgerTransactionInputV2 = {
        blockchainId: process.env.BLOCKCHAIN_ID,
        to: my_address,
        from: my_address,
        payload: {input: "..."},
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
        console.log('->', typeof txn)
        res.status(200).json({ txn });
    } catch (error) {
        res.status(500).json({ error });
        console.error("Fail ", error);
    }
}

function sha256Hash(data: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}
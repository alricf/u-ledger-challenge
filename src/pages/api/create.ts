import { NextApiRequest, NextApiResponse } from 'next';
const { ULedgerTransactionInputV2, ULedgerTransactionSessionV2 } = require('@uledger/uledger-sdk');
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

export default async function createTransactionHandler(req: NextApiRequest, res: NextApiResponse) {

    const my_address = sha256Hash(publicKey);

    try {
        const txnSession = new ULedgerTransactionSessionV2({
        nodeUrl: process.env.NODEURL,
        atomicClockUrl: process.env.ATOMICCLOCKURL,
        nodeId: process.env.NODEID
        });

        const txnInputData: ULedgerTransactionInputV2 = {
        blockchainId: process.env.BLOCKCHAINID,
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
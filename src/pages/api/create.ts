// Imports
import { NextApiRequest, NextApiResponse } from 'next';
const { ULedgerTransactionInputV2, ULedgerTransactionSessionV2 } = require('@uledger/uledger-sdk');
import crypto from 'crypto';

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

// Blockchain transaction begins
export default async function createTransactionHandler(req: NextApiRequest, res: NextApiResponse) {
  
  // Set payload from body
  let payload = req.body;
  const uuid = crypto.randomUUID();

  // Assign patient ID to payload
  payload['patientId'] = uuid;

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
      from: '06dc8681fbdae36d8235fe1c86f531b6c13cd722b8c2bc9cebea3d2acded0d2d',
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

    console.log(txn);
    res.status(200).json({ txn });
  } catch (error) {
    res.status(500).json({ error });
    console.error("Fail ", error);
  }

}

// Create hash
function sha256Hash(data: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}
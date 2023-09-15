// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

// ULedger SDK Import
import { ULedgerTransactionInputV2, ULedgerTransactionSessionV2 } from '@uledger/uledger-sdk';

import crypto from 'crypto';


type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
  /*
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // Adjust the key size as needed
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  function sha256Hash(data: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex'); // Returns a 64-character hexadecimal string (32 bytes)
  }

  function printEncodedStringLength(data: string): void {
    // Create a new TextEncoder object
    const encoder = new TextEncoder();

    // Encode the string as UTF-8
    const encodedString = encoder.encode(data);

    // The length of the encoded string gives you the number of bytes
    console.log('Data Size (bytes):', encodedString.length);
  }

  async function main() {
    console.log("Public Key: ", publicKey);
    printEncodedStringLength(publicKey);

    const my_address = sha256Hash(publicKey);

    console.log("My address ", my_address);
    printEncodedStringLength(my_address);

    try {
      (async () => {
        const txnSession = new ULedgerTransactionSessionV2(
          {
            nodeUrl: "https://node1.network.uledger.io",
            // url is a parameter coming from ULedger Team, make sure you specify the version.
            atomicClockUrl: "https://uledger.net/api/v1/acs",
            nodeId: "51c7be67796f168548f0e82306095aeec58989940a9b1aedf1e758df8746d508"
          }
        );

        // Customize the payload to be sent
        const txnInputData: ULedgerTransactionInputV2 = {
          blockchainId: "f78b4aeb3979871111ae2984de352dee0a3e0da01c1236274dfbfb95e2ee05e3",
          to: my_address,
          from: my_address,
          payload: {
            myPayload: "Hello World!",
            foo: "bar",
            sampleData: 100
          },
          payloadType: "DATA",
          senderSignature: "UPDATE THIS AFTER SIGNING AND BEFORE UPLOADING"
        };

        // Create a JSON string based off of the transaction payload
        const inputString = JSON.stringify(txnInputData.payload);

        // Calculate the Keccak (SHA-3) hash using js-sha3
        const hash = sha256Hash(inputString);

        console.log('Keccak (SHA-3) Hash of Transaction Payload:', hash);

        // Sign the hash with the private key
        const sign = crypto.createSign('RSA-SHA256');
        sign.update(hash);
        const signature = sign.sign(privateKey, 'base64');

        // Update the transaction
        txnInputData.senderSignature = sha256Hash(signature);
        printEncodedStringLength(sha256Hash(signature));
        console.log("Transaction Signature: ", sha256Hash(signature));
        printEncodedStringLength(sha256Hash(signature));

        // Send the request to the node
        const txn = await txnSession.createTransaction(txnInputData);
        // Show the result
        console.log(txn);

       
      })();
    } catch (error) {
      console.log("Fail ", error);
    }
    
  }

  main();
  */
}


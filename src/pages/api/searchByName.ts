import { NextApiRequest, NextApiResponse } from 'next';
const { ULedgerBMSSession } = require('@uledger/uledger-sdk');

export default async function searchByName(req: NextApiRequest, res: NextApiResponse) {
  
  try {

    const session = new ULedgerBMSSession({
      url: "https://uledger.net/api/v1/bms"
    });

    const trim = false;

    const limit = 20;
    const offset = 0;
    const sort = true; 

    // List transactions in blockchain
    const txns = await session.listTransactions("f78b4aeb3979871111ae2984de352dee0a3e0da01c1236274dfbfb95e2ee05e3", limit, offset, sort, trim);

    //console.log("Retrieved transactions in chain:\n", txns); 
    
    //res.status(200).json(txns['payload']);

    const payloads = txns.payload;

    //console.log(payload);

    for (let txn in payloads) {
      console.log(txn)
    }

    //for 
  } catch (e) {
    res.status(500).json({ e: "Error -> transaction error" });
    console.error("Fail ->", e);
  }
}


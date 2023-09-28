// Imports
import { NextApiRequest, NextApiResponse } from 'next';
const { ULedgerBMSSession } = require('@uledger/uledger-sdk');

export default async function readTransactionHandler(req: NextApiRequest, res: NextApiResponse) {

  try {
    // Create a session with the ULedger blockchain
    const session = new ULedgerBMSSession({
      url: "https://uledger.net/api/v1/bms"
    });

    const trim = false;
    const transactionId = req.body.transactionId;

    // Receiving transaction data from the ULedger blockchain
    const bmsTxn = await session.searchTransactionById(transactionId, trim);
    const txPayload = eval('(' + bmsTxn.payload + ')');

    // Sending transaction payload data to front-end
    res.status(200).json({ txPayload });
  } catch (error) {
    // Sending error message to front-end
    res.status(500).json({ error: "Error -> Enter a valid Transaction ID" });
  }
}
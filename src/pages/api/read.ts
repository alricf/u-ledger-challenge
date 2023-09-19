import { NextApiRequest, NextApiResponse } from 'next';
const { ULedgerBMSSession } = require('@uledger/uledger-sdk');

export default async function readTransactionHandler(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.body.transactionId)
  
  try {

    const session = new ULedgerBMSSession({
      url: "https://uledger.net/api/v1/bms"
    });

    const trim = false;

    // const transactionId = "8861c0baf78c640cff8c4c51a06cd1605fce64706e5508806546a87419e21c14";
    const transactionId = req.body.transactionId;

    const bmsTxn = await session.searchTransactionById(transactionId, trim);
    const txPayload = eval('(' + bmsTxn.payload + ')');

    console.log("Retreived transaction by ID:\n", txPayload, typeof txPayload);
    res.status(200).json({ txPayload });
  } catch (error) {
    res.status(500).json({ error });
    console.error("Fail ", error);
  }
}
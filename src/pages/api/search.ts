
import { NextApiRequest, NextApiResponse } from 'next'; 
const { ULedgerBMSSession } = require("@uledger/uledger-sdk");

export default async function userHistory(req: NextApiRequest, res: NextApiResponse) {

  try {
    const session = new ULedgerBMSSession({
      url: "https://uledger.net/api/v1/bms"
    });

    // Search terms - which blockchain and which user are we looking for?
    const blockchainId = process.env.BLOCKCHAIN_ID;
    const userIdKeyword = "c85458e3eeb0f6f1013d389635e931ff90457dbaf53cc4495b20e79d8d903905";
    // Pagination parameters 
    const limit = 20;
    const offset = 0;
    const sort = true;
    const trim = false;
    const publicBool = true;
  
    // Send the request
    const history = await session.userHistory(blockchainId, userIdKeyword, limit, offset, sort, trim, publicBool);

    let output: Array<object> = [];
    
    const txns = history.from.payload;

    for (let i = 0; i < txns.length; i++) {
      let tempObject = {
        transactionId: txns[i]["transactionId"],
        payload: eval('(' + txns[i]["payload"] + ')')
      }
      output.push(tempObject);
    };

    // console.log(output);
    res.status(200).json({ output });
  } catch (error) {
    res.status(500).json({ error });
    console.error("Fail ", error);
  }
}
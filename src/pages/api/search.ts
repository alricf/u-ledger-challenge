
import { NextApiRequest, NextApiResponse } from 'next'; 
const { ULedgerBMSSession } = require("@uledger/uledger-sdk");

export default async function userHistory(req: NextApiRequest, res: NextApiResponse) {

  try {
    const session = new ULedgerBMSSession({
      url: "https://uledger.net/api/v1/bms"
    });

    // Search terms - which blockchain and which user are we looking for?
    const blockchainId = process.env.BLOCKCHAIN_ID;
    const userIdKeyword = "06dc8681fbdae36d8235fe1c86f531b6c13cd722b8c2bc9cebea3d2acded0d2d";
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
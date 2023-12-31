// Imports
import { NextApiRequest, NextApiResponse } from 'next'; 
const { ULedgerBMSSession } = require("@uledger/uledger-sdk");

export default async function userHistory(req: NextApiRequest, res: NextApiResponse) {

  try {
    // Create a session with the ULedger blockchain
    const session = new ULedgerBMSSession({
      url: "https://uledger.net/api/v1/bms"
    });

    // Search terms - ULedger blockchain ID and health care provider public wallet
    const blockchainId = process.env.BLOCKCHAIN_ID;
    const userIdKeyword = "dca7029ff6913281a60acf3a6af4d8d66bea03e643f3e6a4da34c390a853c335";
    // Pagination parameters 
    const limit = 20;
    const offset = 0;
    const sort = true;
    const trim = false;
    const publicBool = true;
  
    // Send the request to get all transactions associated with the health care provider wallet
    const history = await session.userHistory(blockchainId, userIdKeyword, limit, offset, sort, trim, publicBool);

    // API response variable
    let output: Array<object> = [];
    
    // Store all transactions where the health care provider public address is the from address associated with the transactions
    const txns = history.from.payload;

    // Building values into the response output variable
    for (let i = 0; i < txns.length; i++) {
      let tempObject = {
        transactionId: txns[i]["transactionId"],
        payload: eval('(' + txns[i]["payload"] + ')')
      }
      output.push(tempObject);
    };

    // Send the response output variable to the front-end
    res.status(200).json({ output });
  } catch (error) {
    // Respond with the error, if there is one
    res.status(500).json({ error });
  }
}
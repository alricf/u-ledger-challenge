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
    const userIdKeyword = "5feb4dd3326c53b1354749033297a506d9ef4652b89b17e2d7f0f6d0a794bb7e";
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
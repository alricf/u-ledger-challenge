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
    const userIdKeyword = "06dc8681fbdae36d8235fe1c86f531b6c13cd722b8c2bc9cebea3d2acded0d2d";
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

import { NextApiRequest, NextApiResponse } from 'next'; const { ULedgerBMSSession } = require("@uledger/uledger-sdk");

export default async function userHistory(req: NextApiRequest, res: NextApiResponse) {

  try {
    const session = new ULedgerBMSSession({
      url: "https://uledger.net/api/v1/bms"
    });

    // Search terms - which blockchain and which user are we looking for?
    const blockchainId = "f78b4aeb3979871111ae2984de352dee0a3e0da01c1236274dfbfb95e2ee05e3";
    const userIdKeyword = "healthCareProviderAddress";
    // Pagination parameters 
    const limit = 10;
    const offset = 0;
    const sort = true;
    const trim = false;
    const publicBool = true;

    // Send the request
    const history = await session.userHistory(blockchainId, userIdKeyword, limit, offset, sort, trim, publicBool);

    const txns = history.from.payload;

    let output: Array<object> = [];

    for (let i = 0; i < txns.length; i++) {
      let tempObject = {
        transactionId: txns[i]["transactionId"],
        payload: txns[i]["payload"]
      };
      output.push(tempObject);
    };

    // console.log(output);
    res.status(200).json({ output });
  } catch (error) {
    res.status(500).json({ error });
    console.error("Fail ", error);
  }
}
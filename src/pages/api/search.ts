const { ULedgerBMSSession } = require("@uledger/uledger-sdk");

async function userHistory() {

  const session = new ULedgerBMSSession({
    url: "https://uledger.net/api/v1/bms"
  });

  // Search terms - which blockchain and which user are we looking for?
  const blockchainId = process.env.BLOCKCHAIN_ID;
  const userIdKeyword = "c85458e3eeb0f6f1013d389635e931ff90457dbaf53cc4495b20e79d8d903905";
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
      payload: eval('(' + txns[i]["payload"] + ')')
    }
    output.push(tempObject);
  };

  console.log(output);

}

userHistory();


import { ULedgerBMSSession } from "@uledger/uledger-sdk";

async function userHistory() {

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
  // Should we exclude the transactions' payloads?
  const trim = false;

  ////////////////////////
  const publicBool = true;
  ////////////////////////
  
  // Send the request
  const history = await session.userHistory(blockchainId, userIdKeyword, limit, offset, sort, trim, publicBool);
  // Log the result
  console.log(`Transactions FROM userIds matching '${userIdKeyword}':`);
  console.log(history.from);
  console.log(`\nTransactions TO userIds matching '${userIdKeyword}':`);
  console.log(history.to);

}

userHistory();
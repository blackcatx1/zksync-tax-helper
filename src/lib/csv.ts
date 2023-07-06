// Takes the tx and the set of tokens and the account address to resolve
// the transaction data.
export const formatData = (
  tx: Transaction,
  tokenSet: ExtendedTokens,
  analyzedAddress: string
): Record<string, string> => {
  const tokenInfo = getTokenById(tokenSet, tx.op.token);
  if (!tokenInfo) throw new Error(`could not resolve tokenId ${tx.op.token}`);
  const { symbol, decimals } = tokenInfo;
  const formattedValue = ethers.utils.formatUnits(tx.op.amount, decimals);
  const fee = ethers.utils.formatUnits(tx.op.fee, decimals);
  let rq = "";
  let sq = "";
  let rc = "";
  let sc = "";
  const feeCurrency = symbol;
  // Check the context of the user are they send or receiving
  if (tx.op.from.toLowerCase() === analyzedAddress.toLowerCase()) {
    // user is sending
    sq = formattedValue;
    sc = symbol;
  } else {
    // user is receiving
    rq = formattedValue;
    rc = symbol;
  }
  // Add new fields for zkSync Era
  const transactionType = tx.op.type; // Add the transaction type
  const transactionStatus = tx.status; // Add the transaction status
  return {
    Date: formatDate(tx.createdAt),
    "Received Quantity": rq,
    "Received Currency": rc,
    "Sent Quantity": sq,
    "Sent Currency": sc,
    "Fee Amount": fee,
    "Fee Currency": feeCurrency,
    "Transaction Type": transactionType, // Add the transaction type to the CSV
    "Transaction Status": transactionStatus, // Add the transaction status to the CSV
    Tag: ""
  };
};

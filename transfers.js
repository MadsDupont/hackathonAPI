const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');

require('dotenv').config();

const main = async () => {
  // Create connection to DataHub Celo Network node
  //const web3 = new Web3(process.env.REST_URL);
  //connect to Celo network directly
  const web3 = new Web3(process.env.REST_URL_CELO);
  const client = ContractKit.newKitFromWeb3(web3);

  // Initialize account from our private key
  const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

  // We need to add private key to ContractKit in order to sign transactions
  client.addAccount(account.privateKey);

  // Specify recipient Address
  const recipientAddress = '0xa4daebb644a5fe89d287788fee50d09408e3136a';

  // Specify an amount to send
  const amount = 100000;

  // Get contract wrappers
  const goldtoken = await client.contracts.getGoldToken();
  const stabletoken = await client.contracts.getStableToken();

  // Transfer CELO and cUSD from your account to anAddress
  // Specify cUSD as the feeCurrency when sending cUSD
  const celotx = await goldtoken.transfer(recipientAddress, amount).send({from: account.address})
      .catch((err) => { throw new Error(`Could not transfer CELO: ${err}`) });
    const cUSDtx = await stabletoken.transfer(recipientAddress, amount).send({from: account.address, feeCurrency: stabletoken.address})
      .catch((err) => { throw new Error(`Could not transfer cUSD: ${err}`) });

  // Wait for the transactions to be processed
  const celoReceipt = await celotx.waitReceipt();
  const cUSDReceipt = await cUSDtx.waitReceipt();

  // Print receipts
  console.log('CELO Transaction receipt:', celoReceipt);
  console.log('cUSD Transaction receipt:', cUSDReceipt);
};

main().catch((err) => {
  console.error(err);
});
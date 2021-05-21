const express = require('express');
const router = express.Router();
const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')

// 2. Init a new kit, connected to the alfajores testnet
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)

router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'https://youthful-euclid-8ef091.netlify.app');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    //readAccount();
    send();
    res.send("Money is send.....");    
    
});

// Read Accounts
async function readAccount(){
    // 3. Get the token contract wrappers
    let goldtoken = await kit.contracts.getGoldToken()
    let stabletoken = await kit.contracts.getStableToken()
    
    // 4. Address to look up
    let anAddress = '0x124cE8761E507955c7819120631020F55279fE36'

    // 5. Get token balances
    let celoBalance = await goldtoken.balanceOf(anAddress)
    let cUSDBalance = await stabletoken.balanceOf(anAddress)

    // Print balances
    console.log(`${anAddress} CELO balance: ${celoBalance.toString()}`)
    console.log(`${anAddress} cUSD balance: ${cUSDBalance.toString()}`)
}

async function send(){
    // 10. Get your account
    //let account = await getAccount()
    
    const account = web3.eth.accounts.privateKeyToAccount('0x3b02165483eec852c217db5ca52f5e5f2665e23674c276e1d85395777f69ff70');
    // 11. Add your account to ContractKit to sign transactions
    //kit.connection.addAccount(account.privateKey);
    kit.addAccount(account.privateKey);
    
    // 12. Specify recipient Address    
    //let anAddress = '0x9ef546c352ef37538aaf58ed5c2f960bc0176b7d'
    let anAddress = '0x13b2BB7FFDAA08A95363b7bDB0a9E0eef6E03fC6'
    
    // 13. Specify an amount to send
    let amount = 10000000000000000

    // 14. Get the token contract wrappers    
    let goldtoken = await kit.contracts.getGoldToken()
    let stabletoken = await kit.contracts.getStableToken()

    // 15. Transfer CELO and cUSD from your account to an Address
    // Specify cUSD as the feeCurrency when sending cUSD
    let celotx = await goldtoken.transfer(anAddress, amount).send({from: account.address})
    let cUSDtx = await stabletoken.transfer(anAddress, amount).send({from: account.address, feeCurrency: stabletoken.address})

    // 16. Wait for the transactions to be processed
    let celoReceipt = await celotx.waitReceipt()
    let cUSDReceipt = await cUSDtx.waitReceipt()

    // 17. Print receipts
    console.log('CELO Transaction receipt: %o', celoReceipt)
    console.log('cUSD Transaction receipt: %o', cUSDReceipt)

    // 18. Get your new balances
    let celoBalance = await goldtoken.balanceOf(account.address)
    let cUSDBalance = await stabletoken.balanceOf(account.address)

    // 19. Print new balance
    console.log(`Your new account CELO balance: ${celoBalance.toString()}`)
    console.log(`Your new account cUSD balance: ${cUSDBalance.toString()}`)
}

module.exports = router;

const express = require('express');
const router = express.Router();
const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')

// 2. Init a new kit, connected to the alfajores testnet
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)

router.get('/', function(req, res, next) {
    
    readAccount();
    res.send("Money is send.....");    
    
});

// Read Accounts
async function readAccount(){
    // 3. Get the token contract wrappers
    let goldtoken = await kit.contracts.getGoldToken()
    let stabletoken = await kit.contracts.getStableToken()
    
    // 4. Address to look up
    let anAddress = '0xe318464ecdd4fcaa290bd072923c5d9820ed6bb4'

    // 5. Get token balances
    let celoBalance = await goldtoken.balanceOf(anAddress)
    let cUSDBalance = await stabletoken.balanceOf(anAddress)

    // Print balances
    console.log(`${anAddress} CELO balance: ${celoBalance.toString()}`)
    console.log(`${anAddress} cUSD balance: ${cUSDBalance.toString()}`)
}


module.exports = router;
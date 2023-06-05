const { Alchemy, Network, Wallet, Utils } = require('alchemy-sdk');
require('dotenv').config();

const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env;

const settings = {
  apiKey: TEST_API_KEY,
  network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(settings);

let wallet = new Wallet(TEST_PRIVATE_KEY);

async function main() {
  try {
    const nonce = await alchemy.core.getTransactionCount(
      wallet.address,
      'latest'
    );
    console.log("🚀 ~ file: index.js:19 ~ main ~ nonce:", nonce)
  
    let transaction = {
      to: '0x0a1Ea7D185e531a782dc234202f35Ae344c8eF0B',//choose any address!,
      value: Utils.parseEther('0.01'), // 0.001 worth of MATIC being sent
      gasLimit: '21000',
      maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
      maxFeePerGas: Utils.parseUnits('20', 'gwei'),
      nonce: nonce,
      type: 2,
      // chainId: 0, // goerli transaction
      // chainId: 1, // sepolia eth transaction
      chainId: 80001, // mumbai transaction
    };
    console.log("🚀 ~ file: index.js:31 ~ main ~ transaction:", transaction)
  
    let rawTransaction = await wallet.signTransaction(transaction);
    console.log('Raw tx: ', rawTransaction);
    let tx = await alchemy.core.sendTransaction(rawTransaction);
    console.log("🚀 ~ file: index.js:37 ~ main ~ tx:", tx)
    // console.log(`https://mumbai.polygonscan.com/tx/${tx.hash}`);
  } catch (error) {
    console.log("🚀 ~ file: index.js:39 ~ main ~ error:", error)
  }
}

main();
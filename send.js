import Web3 from "web3";
import dotenv from "dotenv";

dotenv.config();

const VPS_IP = process.env.VPS_IP;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const FROM = process.env.FROM;
const TO = process.env.TO;
console.log(VPS_IP);
// 替换为你的节点URL
const providerUrl = `http://${VPS_IP}:8545`;

// 创建Web3实例
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

// 设置交易数据
const txData = {
  from: FROM, // 替换为你的地址
  to: TO, // 替换为接收方地址
  value: web3.utils.toWei("0.1", "ether"), // 发送金额，单位为 ether
};

// 私钥，用于签名交易
const privateKey = PRIVATE_KEY; // 替换为你的私钥

async function signAndSendTransaction() {
  try {
    // 获取当前的 gas 价格
    const gasPrice = await web3.eth.getGasPrice();

    // 估算交易所需的 gas 量
    const estimatedGas = await web3.eth.estimateGas(txData);

    // 设置交易数据中的 gas 和 gasPrice
    txData.gas = estimatedGas;
    txData.gasPrice = gasPrice;

    // 签名交易
    const signedTx = await web3.eth.accounts.signTransaction(
      txData,
      privateKey
    );

    // 发送已签名的交易并获取回执
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    // 打印交易回执
    console.log("Transaction receipt:", receipt);
  } catch (error) {
    console.error("Error signing or sending transaction:", error);
  }
}

// 每6秒执行一次交易
setInterval(signAndSendTransaction, 6000);

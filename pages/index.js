import Head from 'next/head'
import Web3Modal from "web3modal";
import { Contract, providers, utils} from "ethers";
import { useEffect, useRef, useState } from "react";
import { abi } from "../constants/index.js";
//https://etherscan.io/address/0x1f98431c8ad98523631ae4a59f267346ea31f984#code 
//const { abi: UniswapV3Factory } = require('@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json')
import styles from '../styles/Home.module.css'

export default function Home() {
// Component state
const [walletConnected, setWalletConnected] = useState(false);
const [address0, setAddress0] = useState("");
const [address1, setAddress1] = useState("");
const [poolFees, setPoolFees] = useState("");
const [amountIn,setAmountIn] = useState("");
const [secondsAgo,setSecondsAgo] = useState("");
const [amountOut,setAmountOut] = useState("");
//----------------------------------------------------------------------------------------//

// Connect to Metamask  
const web3ModalRef = useRef();

const getProviderOrSigner = async (needSigner = false) => {
  const provider = await web3ModalRef.current.connect();
  const web3Provider = new providers.Web3Provider(provider);

  // If user is not connected to the Goerli network, let them know and throw an error
  const { chainId } = await web3Provider.getNetwork();
  if (chainId !== 5) {
    window.alert("Change the network to goerli-testnet");
    throw new Error("Change network to goerli-testnet");
  }

  if (needSigner) {
    const signer = web3Provider.getSigner();
    return signer;
  }
  return web3Provider;
};

//---------------------------------------------------------------------------------------//

//Check wallet is connected or not
 const connectWallet = async () => {
  try {
    // Get the provider from web3Modal, which in our case is MetaMask
    // When used for the first time, it prompts the user to connect their wallet
    await getProviderOrSigner();
    setWalletConnected(true);

  } catch (err) {
    console.error(err);
  }
};

//--------------------------------------------------------------------------------------//

useEffect(() => {
  // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
  console.log(walletConnected);
  if (!walletConnected) {
    // Assign the Web3Modal class to the reference object by setting it's `current` value
    // The `current` value is persisted throughout as long as this page is open
    web3ModalRef.current = new Web3Modal({
      network: "mainnet",
      providerOptions: {},
      disableInjectedProvider: false,
    });
   // connectWallet();
  }
},[walletConnected]);

//--------------------------------------------------------------------------------------//

const onAddress0Change = (event) => {
  setAddress0(event.target.value.toString());
}

const onAddress1Change = (event) => {
  setAddress1(event.target.value.toString());
}

const onPoolFeesChange = (event) => {
  setPoolFees(event.target.value);
}

const onAmountInChange = (event) => {
  setAmountIn(event.target.value);
}

const onSecondsAgoChange = (event) => {
  setSecondsAgo(event.target.value);
}

//-------------------------------------------------------------------------------------//

//Read-only functions
const UniswapV3FactoryAddress = '0x1F98431c8aD98523631AE4a59f267346ea31F984'
const oracleTwapAddress = '0xbb4B97578DE71Fc25693DbaC88899F44921F4211'
const getEstimatedAmount = async () => {
  try {
    const provider = await getProviderOrSigner();
  
    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    const oracleTWAPContract = new Contract(
      oracleTwapAddress,
      abi,
      provider
    );
    
    const _amountOutHex = await oracleTWAPContract.estimateAmountOut(poolFees,address0,address1,amountIn,secondsAgo);//returns hex
    const _amountOutInt = parseInt(_amountOutHex._hex,16) //convert to int
    console.log(poolFees)
    console.log(address0)
    console.log(address1)
    console.log(amountIn)
    console.log(secondsAgo)
    setAmountOut(_amountOutInt);
    console.log(amountOut)
  } 
  
  catch (err) {
    setAmountOut("Pool doesn't Exist");
    console.error(err);
  }
};


//-----------------------------------------------------------------------------------------//


//https://docs.uniswap.org/protocol/reference/deployments 
//Mainnet Addresses

  return (
    <div className={styles.container}>
    <Head>
      <title>Uniswap V3 Oracle</title>
      <meta name="description" content="TWAP Finder" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
<main className={styles.main}>
  <h1 className={styles.title}>
        Uniswap V3 Oracle
  </h1>
  <br/>
  <h5 style={{color: " #3333ff"}}>
  Calculates the amount of token received in exchange
  </h5>
  <br/>  
{ walletConnected ? (
<div>
  <form>
  <div className="row">

    <div className="col">
    <label>Token In</label>
      <input type="text" className="form-control"  id="address0" placeholder="Asset 1 Address" onChange={onAddress0Change}/>
    </div>
    <br/><br/><br/>

    <div className="col">
    <label>Token Out</label>
      <input type="text" className="form-control"  id="address1" placeholder="Asset 2 Address" onChange={onAddress1Change}/>
    </div>
    <br/><br/><br/><br/><br/><br/>

    <div className="col">
    <label>Amount In</label>
      <input type="text" className="form-control"  id="address0" placeholder="Amount In" onChange={onAmountInChange}/>
    </div>
    <br/><br/><br/>

    <div className="col">
    <label>Seconds Ago</label>
      <input type="text" className="form-control"  id="address0" placeholder="in seconds" onChange={onSecondsAgoChange}/>
    </div>
    <br/><br/><br/>

    <div className="col">
    <label>Pool Fees</label>
      <input type="text" className="form-control"  id="address0" placeholder="Pool Fees" onChange={onPoolFeesChange}/>
    </div>
    <br/><br/><br/>
  
        {/* type is button here(important) since not submitting the inputs */}
    <button type="button" className="btn btn-primary mb-2" onClick={getEstimatedAmount}>Estimated Amount Out</button>
  </div>
</form>
</div>
) : 
(<button type="button" className="btn btn-primary mb-2" onClick={connectWallet}> Connect your wallet </button>)}
</main> 
{walletConnected && (<h1 style={{color: " #3333ff"}}>{amountOut}</h1>)}
</div>

  )
}

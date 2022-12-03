import { useState, useEffect } from "react";

import Title from "./components/title/title";
import ConnectButton from "./components/connect-button/connect-button";
import "./app.css";

const App = () => {
  const [metamaskAccount, setMetamaskAccount] = useState("");

  useEffect(() => {
    const ethereum = window.ethereum;

    if (!ethereum) {
      console.error("Make sure you have Metamask!");
    } else {
      ethereum.request({ method: "eth_accounts" })
        .then((accounts: any) => {
          if (accounts.length) {
            console.log("Found an authorized account:", accounts[0]);
            setMetamaskAccount(accounts[0]);
          } else {
            console.error("No authorized account found");
          }
        });
    }
  }, []);

  const connectWallet = () => {
    const ethereum = window.ethereum;

    if (!ethereum) {
      console.error("Make sure you have Metamask!");
    } else {
      ethereum.request({ method: "eth_requestAccounts" })
        .then((accounts: any) => {
          setMetamaskAccount(accounts[0]);
        });
    }
  };

  return (
    <div className="main-container">
      <div className="head-container flex justify-around align-center">
        <div>
          socials
        </div>
        <Title />
        <ConnectButton connectWallet={connectWallet} />
      </div>
    </div>
  );
}

export default App;
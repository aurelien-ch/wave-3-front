import { useEffect } from "react";

import { useMetamaskProvider } from "./providers/metamask-provider";
import Socials from "./components/socials/socials";
import Title from "./components/title/title";
import ConnectButton from "./components/connect-button/connect-button";
import "./app.css";

const App = () => {
  const metamaskProvider = useMetamaskProvider();

  useEffect(() => {
    if (metamaskProvider.getEthereum()) {
      metamaskProvider.findConnectedAccount();
    }
  }, [metamaskProvider]);

  return (
    <div className="main-container">
      <div className="head-container">
        <Socials />
        <Title />
        <ConnectButton />
      </div>
    </div>
  );
}

export default App;
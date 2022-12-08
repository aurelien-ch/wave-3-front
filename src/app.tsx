import { useEffect } from "react";

import { useMetamaskProvider } from "./providers/metamask-provider";
import Header from "./components/header/header";
import WaveBox from "./components/wave-box/wave-box";
import WavesList from "./components/waves-list/waves-list";
import TopWavers from "./components/top-wavers/top-wavers";

import "./app.css";

const App = () => {
  const metamaskProvider = useMetamaskProvider();

  useEffect(() => {
    if (metamaskProvider.getEthereum()) {
      metamaskProvider.findConnectedAccount();
    }
  }, [metamaskProvider]);

  return (
    <div className="app-container">
      <Header />
      <WaveBox />
      <div className="lists-container flex">
        <WavesList />
        <TopWavers />
      </div>
    </div>
  );
};

export default App;
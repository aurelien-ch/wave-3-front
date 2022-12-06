import { useEffect } from "react";

import { useMetamaskProvider } from "./providers/metamask-provider";
import Header from "./components/header/header";
import WaveBox from "./components/wave-box/wave-box";

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
      {/* <WaveBox /> */}
    </div>
  );
}

export default App;
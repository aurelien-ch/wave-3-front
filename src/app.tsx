import { useEffect } from "react";

import { useMetamaskProvider } from "./providers/metamask-provider";
import Header from "./components/header/header";

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
      <Header />
    </div>
  );
}

export default App;
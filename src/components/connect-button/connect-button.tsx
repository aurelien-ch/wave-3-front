import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { useStore } from "../../providers/state/state-provider";
import { useMetamaskProvider } from "../../providers/metamask-provider";

import "./connect-button.css";

const ConnectButton = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const { t } = useTranslation();
  const metamaskProvider = useMetamaskProvider();
  const metamaskAccount = useStore(state => state.metamaskAccount);

  const connectAccount = () => {
    if (isMobile) {
      window.open("https://metamask.app.link/dapp/" + window.location.href, "_blank");
    } else {
      metamaskProvider.connectAccount();
    }
  };

  return (
    <div
      className={`connect-button ${metamaskAccount ? "connected" : ""}`}
      onClick={connectAccount}
    >
      {metamaskAccount ? metamaskProvider.formatAddress(metamaskAccount) : t("header.connect")}
      {
        !metamaskAccount && (
          <img
            className="metamask-icon"
            alt="metamask"
            src={require("../../assets/icons/metamask.png")}
          />
        )
      }
    </div>
  );
};

export default ConnectButton;
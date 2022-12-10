import { useTranslation } from "react-i18next";

import { useStore } from "../../providers/state/state-provider";
import { useMetamaskProvider } from "../../providers/metamask-provider";

import "./connect-button.css";

const ConnectButton = () => {
  const { t } = useTranslation();
  const metamaskProvider = useMetamaskProvider();

  const metamaskAccount = useStore(state => state.metamaskAccount);

  const formatAddress = (address: string) => {
    return address.substring(0, 6) + "..." + address.substring(address.length - 4);
  }

  return (
    <div
      className={`connect-button ${metamaskAccount ? "connected" : ""}`}
      onClick={metamaskProvider.connectAccount}
    >
      {metamaskAccount ? formatAddress(metamaskAccount) : t("header.connect")}
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
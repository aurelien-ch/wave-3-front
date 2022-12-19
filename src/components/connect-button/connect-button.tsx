import { useTranslation } from "react-i18next";

import { useStore } from "../../providers/state/state-provider";
import { useMetamaskProvider } from "../../providers/metamask-provider";

import "./connect-button.css";

const ConnectButton = () => {
  const { t } = useTranslation();
  const metamaskProvider = useMetamaskProvider();

  const metamaskAccount = useStore(state => state.metamaskAccount);
  const setModal = useStore(state => state.setModal);

  const connectAcccount = () => {
    if (!metamaskProvider.getEthereum()) {
      setModal({
        show: true,
        title: t("modal.error"),
        content: [t("errors.installMetamask1"), t("errors.installMetamask2")],
      });
    } else {
      metamaskProvider.connectAccount();
    }
  };

  return (
    <div
      className={`connect-button ${metamaskAccount ? "connected" : ""}`}
      onClick={connectAcccount}
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
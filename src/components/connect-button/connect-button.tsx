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
      className="connect-button"
      onClick={() => metamaskProvider.connectAccount()}
    >
      {metamaskAccount ? formatAddress(metamaskAccount) : t("connect")}
    </div>
  );
}

export default ConnectButton;
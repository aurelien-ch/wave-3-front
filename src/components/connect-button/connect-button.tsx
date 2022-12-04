import { useTranslation } from "react-i18next";

import "./connect-button.css";

interface ConnectButtonProps {
  connectWallet: Function,
  metamaskAccount: string | undefined,
}

const ConnectButton = ({ connectWallet, metamaskAccount }: ConnectButtonProps) => {
  const { t } = useTranslation();

  const formatAddress = (address: string) => {
    return address.substring(0, 6) + "..." + address.substring(address.length - 4);
  }

  return (
    <div
      className="connect-button"
      onClick={() => connectWallet()}
    >
      {metamaskAccount ? formatAddress(metamaskAccount) : t("connect")}
    </div>
  );
}

export default ConnectButton;
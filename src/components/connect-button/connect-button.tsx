import { useTranslation } from "react-i18next";

import "./connect-button.css";

const ConnectButton = ({ connectWallet }: { connectWallet: Function }) => {
  const { t } = useTranslation();

  return (
    <div
      className="connect-button"
    // onClick={() => connectWallet()}
    >
      {t("connect")}
    </div>
  );
}

export default ConnectButton;
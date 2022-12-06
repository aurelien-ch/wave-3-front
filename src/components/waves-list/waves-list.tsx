import { useTranslation } from "react-i18next";

import "./waves-list.css";

const WavesList = () => {
  const { t } = useTranslation();

  return (
    <div className="waves-list">
      <div>{t("wavesList")}</div>
    </div>
  );
};

export default WavesList;
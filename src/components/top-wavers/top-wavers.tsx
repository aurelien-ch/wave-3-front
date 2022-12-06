import { useTranslation } from "react-i18next";

import "./top-wavers.css";

const TopWavers = () => {
  const { t } = useTranslation();

  return (
    <div className="top-wavers">
      <div>{t("wavesList")}</div>
    </div>
  );
};

export default TopWavers;
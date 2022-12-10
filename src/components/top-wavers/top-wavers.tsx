import { useTranslation } from "react-i18next";

import "./top-wavers.css";

const TopWavers = () => {
  const { t } = useTranslation();

  return (
    <div className="top-wavers">
      <div className="top-wavers-label font-bold">
        {t("topWavers.topWavers")}
      </div>
    </div>
  );
};

export default TopWavers;
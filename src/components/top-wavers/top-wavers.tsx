import { useTranslation } from "react-i18next";

import "./top-wavers.css";

const TopWavers = () => {
  const { t } = useTranslation();

  return (
    <div className="top-wavers">
      <div className="top-wavers-label font-bold">
        {t("topWavers.topWavers")}
      </div>
      <div className="wavers-container">
        {
          false ? (
            <div />
          ) : (
            <div className="please-connect-label">
              {t("topWavers.pleaseConnect")}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default TopWavers;
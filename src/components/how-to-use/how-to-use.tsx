import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import "./how-to-use.css";

const HowToUse = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const { t } = useTranslation();

  return (
    <div className={`how-to-use ${isMobile ? "mobile" : ""}`}>
      <div className="font-bold margin-bottom-10">
        {t("howToUse.howToUse")}
      </div>
      <div className="steps">
        <div>{t("howToUse.steps.1")}</div>
        <div>{t("howToUse.steps.2")}</div>
        <div>
          {t("howToUse.steps.3")}
          <a
            className="faucet-link font-bold"
            href={window.env.FAUCET_LINK}
            target="_blank"
            rel="noreferrer"
          >
            {t("generic.here")}
          </a>
        </div>
        <div>{t("howToUse.steps.4")}</div>
      </div>
    </div>
  );
};

export default HowToUse;
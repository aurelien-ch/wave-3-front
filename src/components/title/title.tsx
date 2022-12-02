import { useTranslation } from "react-i18next";

import "./title.css";

const Title = () => {
  const { t } = useTranslation();

  return (
    <div className="title">
      {t("wave3")}
    </div>
  );
}

export default Title;
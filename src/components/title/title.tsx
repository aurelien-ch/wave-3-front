import { useTranslation } from "react-i18next";

import "./title.css";

const Title = () => {
  const { t } = useTranslation();

  return (
    <div className="title">
      <span>W</span>
      <span>a</span>
      <span>v</span>
      <span>e</span>
      <span>3</span>
    </div>
  );
}

export default Title;
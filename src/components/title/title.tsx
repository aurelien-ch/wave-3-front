import { useMediaQuery } from "react-responsive";

import "./title.css";

const Title = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1000px)" });

  return (
    <div className={`header-title ${isMobile ? "mobile" : isTablet ? "tablet" : ""}`}>
      <span>W</span>
      <span>a</span>
      <span>v</span>
      <span>e</span>
      <span>3</span>
    </div>
  );
};

export default Title;
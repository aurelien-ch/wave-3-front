import { useMediaQuery } from "react-responsive";

import "./title.css";

const Title = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1000px)" });
  const isSafari = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");

  return (
    <div className={`header-title ${isMobile ? "mobile" : isTablet ? "tablet" : ""} ${isSafari ? "safari" : ""}`}>
      <span className={isSafari ? "first-title-letter-safari" : ""}>
        W
      </span>
      <span>a</span>
      <span>v</span>
      <span>e</span>
      <span>3</span>
    </div>
  );
};

export default Title;
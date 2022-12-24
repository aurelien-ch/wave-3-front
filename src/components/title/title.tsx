import { useMediaQuery } from "react-responsive";

import { useMetamaskProvider } from "../../providers/metamask-provider";

import "./title.css";

const Title = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1000px)" });
  const metamaskProvider = useMetamaskProvider();
  const isSafariOrMetamask = (navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) || (isMobile && metamaskProvider.getEthereum());

  return (
    <div className={`header-title ${isMobile ? "mobile" : isTablet ? "tablet" : ""} ${isSafariOrMetamask ? "safari" : ""}`}>
      <span className={isSafariOrMetamask ? "first-title-letter-safari" : ""}>
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
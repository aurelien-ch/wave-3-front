import { useMediaQuery } from "react-responsive";

import { ReactComponent as GitHubSvg } from "../../assets/icons/github.svg";
import { ReactComponent as LinkedInSvg } from "../../assets/icons/linkedin.svg";

import "./socials.css";

const Socials = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  return (
    <div className={`socials flex ${isMobile ? "mobile" : ""}`}>
      <a
        href={window.env.GITHUB_LINK}
        target="_blank"
        rel="noreferrer">
        <GitHubSvg />
      </a>
      <a
        href={window.env.LINKEDIN_LINK}
        target="_blank"
        rel="noreferrer">
        <LinkedInSvg />
      </a>
    </div>
  );
};

export default Socials;
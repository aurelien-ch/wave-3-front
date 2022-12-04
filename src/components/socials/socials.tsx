import { ReactComponent as GitHubSvg } from "../../assets/icons/github.svg";
import { ReactComponent as LinkedInSvg } from "../../assets/icons/linkedin.svg";
import "./socials.css";

const Socials = () => {
  return (
    <div className="socials flex">
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
}

export default Socials;
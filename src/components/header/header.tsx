import { useMediaQuery } from "react-responsive";

import Socials from "../socials/socials";
import Title from "../title/title";
import ConnectButton from "../connect-button/connect-button";

import "./header.css";

const Header = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  return isMobile ? (
    <div className="header-mobile">
      <div className="flex justify-between margin-bottom-10">
        <Socials />
        <ConnectButton />
      </div>
      <Title />
    </div>
  ) : (
    <div className="header">
      <Socials />
      <Title />
      <ConnectButton />
    </div>
  );
};

export default Header;
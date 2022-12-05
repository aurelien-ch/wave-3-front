import Socials from "../socials/socials";
import Title from "../title/title";
import ConnectButton from "../connect-button/connect-button";

import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <Socials />
      <Title />
      <ConnectButton />
    </div>
  );
}

export default Header;
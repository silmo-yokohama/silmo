import React from "react";
import ExternalLink from "../links/ExternalLink";
import GitHubIcon from "../../../assets/svg/GitHubIcon";
import TwitterIcon from "../../../assets/svg/TwitterIcon";

const MenuFooter: React.FC = () => {
  return (
    <footer className="flex justify-center space-x-8">
      <ExternalLink href="https://github.com">
        <GitHubIcon />
      </ExternalLink>
      <ExternalLink href="https://twitter.com">
        <TwitterIcon />
      </ExternalLink>
    </footer>
  );
};

export default MenuFooter;

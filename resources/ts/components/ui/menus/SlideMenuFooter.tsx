import React from "react";
import ExternalLink from "../links/ExternalLink";

const MenuFooter: React.FC = () => {
  return (
    <footer className="flex justify-center space-x-8">
      <ExternalLink href="https://github.com">GitHub</ExternalLink>
      <ExternalLink href="https://twitter.com">Twitter</ExternalLink>
    </footer>
  );
};

export default MenuFooter;

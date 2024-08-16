import React from "react";
import GitHubIcon from "../../../assets/svg/GitHubIcon";
import TwitterIcon from "../../../assets/svg/TwitterIcon";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="t bg-base-100 text-base-content pt-8 pb-20 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {currentYear} SilMo. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/your-github-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-300"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://twitter.com/your-twitter-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-300"
            >
              <TwitterIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

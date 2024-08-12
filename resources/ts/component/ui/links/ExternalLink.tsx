import React from 'react';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

const ExternalMenuLink: React.FC<ExternalLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-link text-sm text-white hover:text-[#ED6D36] transition-colors duration-300"
    >
      {children}
    </a >
  );
};

export default ExternalMenuLink;

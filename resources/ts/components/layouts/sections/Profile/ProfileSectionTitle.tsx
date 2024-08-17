import React, { ReactNode } from "react";

interface ProfileSectionTitleProps {
  children: ReactNode;
}

const ProfileSectionTitle: React.FC<ProfileSectionTitleProps> = ({ children }) => {
  return <h2 className="en-title text-5xl font-bold mb-4 text-center">{children}</h2>;
};

export default ProfileSectionTitle;

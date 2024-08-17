import React from "react";

interface GridLayoutProps {
  children: React.ReactNode;
  columns?: number;
}

const GridLayout: React.FC<GridLayoutProps> = ({ children, columns = 3 }) => {
  const gridClass = `grid grid-cols-1 md:grid-cols-${columns} gap-8`;

  return <div className={gridClass}>{children}</div>;
};

export default GridLayout;

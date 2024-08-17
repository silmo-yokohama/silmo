// resources/ts/components/ui/navigation/Breadcrumb.tsx

import React from "react";
import { Link } from "@inertiajs/react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="bg-base-100 py-2">
      <ol className="container mx-auto px-4 flex flex-wrap items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-500">/</span>}
            {index === items.length - 1 ? (
              <span className="">{item.label}</span>
            ) : (
              <Link href={item.href} className="text-primary hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

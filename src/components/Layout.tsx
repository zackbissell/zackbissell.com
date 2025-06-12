import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <div className="min-h-screen bg-black text-white pt-20">{children}</div>;
};

export default Layout;

import React from 'react';
import { Helmet } from 'react-helmet';

interface ComingSoonProps {
  title: string;
}

const ComingSoon = ({ title }: ComingSoonProps) => (
  <>
    <Helmet>
      <title>{title} – Zack Bissell</title>
    </Helmet>
    <div className="min-h-screen bg-white text-foreground pt-20 flex items-center justify-center">
      <h1 className="text-title1">{title} - Coming Soon</h1>
    </div>
  </>
);

export default ComingSoon;

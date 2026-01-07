// src/components/layout/Container.jsx

import React from 'react';

const Container = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Container;
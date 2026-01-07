// src/components/common/EmptyState.jsx

import React from 'react';
import { FileQuestion } from 'lucide-react';

const EmptyState = ({ 
  title = 'Belum ada data', 
  description = 'Tambahkan data pertama Anda',
  icon: Icon = FileQuestion 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
};

export default EmptyState;
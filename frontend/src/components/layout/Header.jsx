// src/components/layout/Header.jsx

import React from 'react';
import { UserCheck } from 'lucide-react';

const Header = () => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
        <UserCheck className="w-10 h-10 text-indigo-600" />
        Data Absensi Mahasiswa
      </h1>
      <p className="text-gray-600">Kelola data kehadiran mahasiswa dengan mudah</p>
    </div>
  );
};

export default Header;
// src/components/attendance/StatusBadge.jsx

import React from 'react';
import { STATUS_STYLES } from '../../utils/constants';
import { capitalizeFirst } from '../../utils/formatters';

const StatusBadge = ({ status }) => {
  const badgeStyle = STATUS_STYLES[status] || STATUS_STYLES.hadir;
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badgeStyle}`}>
      {capitalizeFirst(status)}
    </span>
  );
};

export default StatusBadge;
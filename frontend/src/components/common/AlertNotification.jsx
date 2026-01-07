// src/components/common/AlertNotification.jsx

import React from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const AlertNotification = ({ type = 'info', message }) => {
  if (!message) return null;

  const alertStyles = {
    error: {
      containerClass: 'border-orange-200 bg-orange-50',
      iconClass: 'text-orange-600',
      textClass: 'text-orange-800',
      Icon: AlertCircle
    },
    success: {
      containerClass: 'border-green-200 bg-green-50',
      iconClass: 'text-green-600',
      textClass: 'text-green-800',
      Icon: CheckCircle
    },
    info: {
      containerClass: 'border-blue-200 bg-blue-50',
      iconClass: 'text-blue-600',
      textClass: 'text-blue-800',
      Icon: Info
    }
  };

  const style = alertStyles[type] || alertStyles.info;
  const Icon = style.Icon;

  return (
    <Alert className={`mb-4 ${style.containerClass}`}>
      <Icon className={`h-4 w-4 ${style.iconClass}`} />
      <AlertDescription className={style.textClass}>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default AlertNotification;
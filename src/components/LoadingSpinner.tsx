import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'accent';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'primary',
  message = 'Loading...' 
}) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const colorClasses = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    accent: 'border-accent'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100px] space-y-3">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-2 border-gray-200 dark:border-gray-600 ${colorClasses[color]} border-t-transparent`}></div>
      <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;

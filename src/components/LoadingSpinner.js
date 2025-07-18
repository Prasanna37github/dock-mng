import React, { memo } from 'react';

const LoadingSpinner = memo(({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div 
        className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
        style={{ 
          willChange: 'transform',
          transform: 'translateZ(0)' // Force hardware acceleration
        }}
      ></div>
      {text && <p className="text-gray-600 text-sm">{text}</p>}
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner; 
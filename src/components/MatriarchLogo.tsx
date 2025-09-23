import React from 'react';
import matriarchLogo from '@/assets/matriarch-logo.jpg';

interface MatriarchLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const MatriarchLogo: React.FC<MatriarchLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <img 
        src={matriarchLogo} 
        alt="Matriarch - Elephant Conservation" 
        className="w-full h-full object-contain rounded-lg"
      />
    </div>
  );
};

export default MatriarchLogo;
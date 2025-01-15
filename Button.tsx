import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...rest }) => {
  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
      break;
    case 'secondary':
      variantClasses = 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded';
      break;
    case 'danger':
      variantClasses = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded';
      break;
  }

  return (
    <button className={`${variantClasses} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
import PropTypes from 'prop-types';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  children,
  className = '',
  ...rest 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-primary/50',
    secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground focus:ring-secondary/50',
    danger: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground focus:ring-destructive/50',
    success: 'bg-success hover:bg-success/90 text-success-foreground focus:ring-success/50',
    warning: 'bg-warning hover:bg-warning/90 text-warning-foreground focus:ring-warning/50',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${disabledClasses} ${className}`;
  
  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button; 
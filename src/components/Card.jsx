import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = '',
  hoverable = false,
  ...props 
}) => {
  return (
    <div 
      className={`bg-card rounded-lg shadow-md overflow-hidden border border-border ${
        hoverable ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card Header component
 */
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 border-b border-border ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card Title component
 */
const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-foreground ${className}`} {...props}>
    {children}
  </h3>
);

/**
 * Card Body component
 */
const CardBody = ({ children, className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card Footer component
 */
const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 bg-gray-50 dark:bg-gray-700/50 ${className}`} {...props}>
    {children}
  </div>
);

// Assign subcomponents to Card
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

// Prop types
const commonPropTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Card.propTypes = {
  ...commonPropTypes,
  hoverable: PropTypes.bool,
};

CardHeader.propTypes = commonPropTypes;
CardTitle.propTypes = commonPropTypes;
CardBody.propTypes = commonPropTypes;
CardFooter.propTypes = commonPropTypes;

export default Card;

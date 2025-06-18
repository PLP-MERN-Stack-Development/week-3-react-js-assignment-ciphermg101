import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl border border-border bg-card text-foreground shadow-sm transition-all duration-200 ${
        hoverable
          ? 'hover:shadow-md hover:-translate-y-1 hover:border-primary/40 transform'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div
    className={`px-6 py-4 border-b border-border bg-muted/50 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3
    className={`text-lg font-semibold leading-tight tracking-tight text-foreground ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardBody = ({ children, className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div
    className={`px-6 py-4 border-t border-border bg-muted text-muted-foreground ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Attach subcomponents
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

// PropTypes
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

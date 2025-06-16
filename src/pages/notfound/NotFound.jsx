import { Link } from 'react-router-dom';
import Button from '@components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button variant="primary" size="lg">
              Go to Homepage
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

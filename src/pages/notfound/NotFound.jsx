import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@components/Button';

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4"
      role="alert"
      aria-labelledby="notFoundTitle"
      aria-describedby="notFoundDescription"
    >
      <div className="text-center max-w-xl">
        <h1
          id="notFoundTitle"
          className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4"
        >
          {t('notFound.title')}
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          {t('notFound.heading')}
        </h2>
        <p
          id="notFoundDescription"
          className="text-gray-600 dark:text-gray-400 text-lg mb-8"
        >
          {t('notFound.description')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button variant="primary" size="lg">
              {t('notFound.actions.home')}
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
          >
            {t('notFound.actions.back')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

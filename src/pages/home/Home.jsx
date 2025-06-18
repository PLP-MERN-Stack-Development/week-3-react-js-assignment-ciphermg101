import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import Card from '@components/Card';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const emojis = ['📝', '📊', '🔔', '🤝', '📱', '🔒'];

const FeatureCard = ({ icon, title, description, delay }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      transition={{ delay: delay * 0.1 }}
      className="w-full h-full"
    >
      <Card className="p-8 h-full group hoverable transition-all duration-300">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-muted group-hover:bg-muted/60 transition-colors">
          <div className="text-2xl text-primary">{icon}</div>
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </Card>
    </motion.div>
  );
};

const Home = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const { t } = useTranslation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const features = t('home.features.items', { returnObjects: true }).map((item, index) => ({
    icon: emojis[index] || '✨',
    title: item.title,
    description: item.description,
  }));

  return (
    <div className="overflow-hidden bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-background">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent" />
        <div className="container px-4 mx-auto">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium mb-6 bg-primary/10 text-primary"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {t('home.newFeature')}
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
            >
              {t('home.title')}{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t('home.titleHighlight')}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-muted-foreground"
            >
              {t('home.subtitle')}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            >
              <Link
                to="/tasks"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-full transition-colors shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 hover:shadow-primary/30"
              >
                {t('home.ctaPrimary')} Free
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-full border transition-colors border-border bg-background hover:bg-muted text-foreground"
              >
                Learn More
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="relative rounded-2xl overflow-hidden border shadow-2xl border-border"
            >
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-background to-transparent" />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2070&q=80"
                alt="Task Manager Dashboard"
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/10">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">{t('home.features.title')}</h2>
            <p className="text-lg text-muted-foreground">{t('home.features.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

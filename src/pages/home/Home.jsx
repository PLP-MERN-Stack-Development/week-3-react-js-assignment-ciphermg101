import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Card from '@components/Card';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const FeatureCard = ({ icon, title, description, delay }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
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
        <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
          <div className="text-primary text-2xl">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </Card>
    </motion.div>
  );
};

const Home = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const features = [
    {
      icon: '📝',
      title: 'Task Management',
      description: 'Easily create, update, and organize your tasks. Set priorities, due dates, and track progress all in one place.'
    },
    {
      icon: '📊',
      title: 'Productivity Analytics',
      description: 'Gain insights into your productivity with detailed analytics and visual reports on your task completion rates.'
    },
    {
      icon: '🔔',
      title: 'Smart Reminders',
      description: 'Never miss a deadline with customizable reminders and notifications for your important tasks and events.'
    },
    {
      icon: '🤝',
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team by sharing tasks, assigning responsibilities, and tracking progress together.'
    },
    {
      icon: '📱',
      title: 'Cross-Platform Sync',
      description: 'Access your tasks from any device with our fully responsive design that works perfectly on desktop and mobile.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We prioritize your privacy and give you full control over your information.'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container px-4 mx-auto">
          <motion.div 
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now with Dark Mode
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              Organize Your Work & Life
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Effortlessly</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              The all-in-one task management solution that helps you stay organized, focused, and in control of your work and personal life.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            >
              <Link 
                to="/tasks" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/30"
              >
                Get Started Free
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link 
                to="/about" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-full border border-border bg-background hover:bg-accent/50 transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="relative rounded-2xl overflow-hidden border border-border shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Task Manager Dashboard" 
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to be productive
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed to help you organize, prioritize, and get more done.
            </p>
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

      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMjAgMGMxMSA0LjUgMTguNSAxMS41IDIzIDIzaC0yM2MtLjUgMC0xLS41LTEtMXYtMjJ6bTIzIDIwaDIydjFjMCAuNS0uNSAxLTEgMWgtMjN6bS0yMyAwdjIyYzAgLjUuNSAxIDEgMWgyM2MtNC41IDExLjUtMTEuNSAxOC41LTIzIDIzdi0yM2MwLS41LjUtMSAxLTF6bTIzLTJ2LTEwaC0xMHYxMGgxMHptLTIwIDBoLTEwdjEwaDEwdi0xMHoiLz48L2c+PC9nPjwvc3ZnPg==')]" />
        </div>
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to transform your productivity?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Join thousands of users who are already managing their tasks more effectively. 
                It's free and takes less than a minute to get started.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/tasks" 
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/30"
                >
                  Start Your Free Trial
                </Link>
                <Link 
                  to="/about" 
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full border border-border bg-background hover:bg-accent/50 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

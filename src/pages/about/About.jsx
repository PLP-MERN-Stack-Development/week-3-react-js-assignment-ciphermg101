import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import Button from '@components/Button';
import Card from '@components/Card';
import { FaGithub, FaTwitter, FaLinkedin, FaGlobe } from 'react-icons/fa6';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { t } = useTranslation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const images = [
    'https://images.unsplash.com/photo-1713947506663-7f630ef496ba?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?auto=format&fit=crop&w=300&q=80',
    'https://plus.unsplash.com/premium_photo-1661301084402-1a0452b5850e?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1665686304355-0b09b1e3b03c?auto=format&fit=crop&w=300&q=80',
  ];

  const socialsList = [
    [
      { name: 'GitHub', url: 'https://github.com/', icon: FaGithub },
      { name: 'Twitter', url: 'https://twitter.com/', icon: FaTwitter },
      { name: 'LinkedIn', url: 'https://linkedin.com/', icon: FaLinkedin },
    ],
    [
      { name: 'GitHub', url: 'https://github.com/', icon: FaGithub },
      { name: 'Twitter', url: 'https://twitter.com/', icon: FaTwitter },
      { name: 'Website', url: 'https://example.com/', icon: FaGlobe },
    ],
    [
      { name: 'GitHub', url: 'https://github.com/', icon: FaGithub },
      { name: 'LinkedIn', url: 'https://linkedin.com/', icon: FaLinkedin },
    ],
    [
      { name: 'Twitter', url: 'https://twitter.com/', icon: FaTwitter },
      { name: 'LinkedIn', url: 'https://linkedin.com/', icon: FaLinkedin },
      { name: 'Website', url: 'https://example.com/', icon: FaGlobe },
    ],
  ];

  const teamMembers = t('about.team.members', { returnObjects: true }).map((m, i) => ({
    ...m,
    image: images[i],
    socials: socialsList[i],
  }));

  const values = t('about.mission.values', { returnObjects: true });
  const stats = t('about.stats.items', { returnObjects: true });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/20 to-transparent" />
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              {t('about.hero.title')}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
              {t('about.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 border-t bg-muted/30 border-border">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('about.mission.title')}</h2>
            <p className="text-lg text-muted-foreground">{t('about.mission.description')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                variants={fadeInUp}
              >
                <Card className="p-6 text-center bg-muted border border-border">
                  <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center bg-accent">
                    <span className="text-xl text-primary">{value.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="py-16 border-t border-border">
          <div className="container px-4 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-primary">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Team */}
      <section className="py-16 md:py-24 border-t bg-muted/30 border-border">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('about.team.title')}</h2>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="p-6 text-center bg-muted border border-border hover:bg-muted/50 transition-all h-full">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-accent">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-3">
                    {member.socials.map((s, i) => (
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                        aria-label={s.name}
                      >
                        <s.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-border bg-accent/30">
        <div className="container px-4 mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {t('about.cta.title')}
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {t('about.cta.subtitle')}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link to="/tasks">
              <Button variant="primary" size="lg">
                {t('about.cta.button')}
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                {t('common.contactUs')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

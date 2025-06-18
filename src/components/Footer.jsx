import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme } from '@contexts/ThemeContext';

const Footer = () => {
  const { t } = useTranslation();
  useTheme();

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { to: '/about', label: t('footer.links.about') },
    { to: '/contact', label: t('footer.links.contact') },
    { to: '/posts', label: t('footer.links.posts') },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: 'github' },
    { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  ];

  return (
    <footer className="mt-auto w-full border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Left */}
          <div className="space-y-6 xl:col-span-1">
            <h2 className="text-2xl font-bold">{t('footer.title')}</h2>
            <p className="text-base text-muted-foreground">{t('footer.description')}</p>
            <div className="flex space-x-4">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="p-2 rounded-full bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`fa-brands fa-${s.icon} text-xl`} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Navigation Links */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {t('footer.navigation')}
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-base text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {t('footer.support')}
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('footer.legal')}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('footer.documentation')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-center text-muted-foreground">
            {t('footer.copyright', {
              year: currentYear,
              defaultValue: `© ${currentYear} TaskFlow. All rights reserved.`,
            })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

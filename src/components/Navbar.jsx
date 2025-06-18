import { Fragment, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const NavLink = ({ to, children, onClick }) => {
  const path = useResolvedPath(to);
  const location = useLocation();
  const isActive = location.pathname === path.pathname;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'text-primary'
          : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      <span className="relative z-10">{children}</span>
      {isActive && (
        <motion.span
          layoutId="activeNavLink"
          className="absolute inset-0 -z-0 rounded-full bg-primary/10 dark:bg-primary/20"
          initial={false}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollProgressRef = useRef(0);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t('nav.home', 'Home') },
    { to: '/about', label: t('nav.about', 'About') },
    { to: '/contact', label: t('nav.contact', 'Contact') },
    { to: '/posts', label: t('nav.posts', 'Posts') },
    { to: '/tasks', label: t('nav.taskManager', 'Task Manager') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);

      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      scrollProgressRef.current = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-50 transition-opacity duration-300"
        style={{ width: `${scrollProgressRef.current}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              TaskFlow
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to}>
                  {link.label}
                </NavLink>
              ))}
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
                aria-label="Open menu"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Transition show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-300"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-300"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-auto bg-background text-foreground shadow-xl">
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <Link
                              to="/"
                              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
                            >
                              TaskFlow
                            </Link>
                            <button
                              onClick={() => setMobileMenuOpen(false)}
                              className="p-2 rounded-md text-muted-foreground hover:bg-muted"
                              aria-label="Close menu"
                            >
                              <XMarkIcon className="h-6 w-6" />
                            </button>
                          </div>

                          <nav className="mt-6 space-y-4">
                            {navLinks.map((link) => (
                              <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-2 rounded-md hover:bg-muted text-foreground"
                              >
                                {link.label}
                              </Link>
                            ))}
                            <div className="pt-4 border-t border-border">
                              <button
                                onClick={() => {
                                  toggleTheme();
                                  setMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted w-full text-left"
                              >
                                {theme === 'dark' ? (
                                  <SunIcon className="h-5 w-5 text-yellow-400" />
                                ) : (
                                  <MoonIcon className="h-5 w-5 text-muted-foreground" />
                                )}
                                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                              </button>
                            </div>
                          </nav>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;

import { Fragment, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useResolvedPath } from 'react-router-dom';
import { useTheme } from '@context/ThemeContext';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ to, children, onClick }) => {
  const path = useResolvedPath(to);
  const location = useLocation();
  const isActive = location.pathname === path.pathname;
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative px-3 py-2 text-sm font-medium transition-colors ${
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      <span className="relative z-10">{children}</span>
      {isActive && (
        <motion.span
          layoutId="activeNavLink"
          className="absolute inset-0 -z-0 rounded-full bg-primary/10"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        />
      )}
    </Link>
  );
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const scrollProgressRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/tasks', label: 'Task Manager' },
    { to: '/posts', label: 'Posts' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current = (scrollPosition / windowHeight) * 100;
      
      setScrolled(scrollPosition > 10);
      
      if (!isScrolling) {
        setIsScrolling(true);
      }
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);

  const handleNavClick = (to) => {
    navigate(to);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div 
        className={`fixed top-0 left-0 right-0 h-0.5 bg-primary/20 z-50 transition-opacity duration-300 ${
          isScrolling ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgressRef.current}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        />
      </div>
      
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/90 backdrop-blur-md shadow-sm' 
            : 'bg-background/80 backdrop-blur-sm'
        }`}
      >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between h-16">
          <div className="flex lg:flex-1">
            <Link to="/" className="flex items-center">
              <motion.span 
                className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                TaskFlow
              </motion.span>
            </Link>
          </div>
          
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="hidden lg:flex lg:gap-x-2">
            {navLinks.map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
            <motion.button
              type="button"
              onClick={toggleTheme}
              className="rounded-full p-2 hover:bg-accent transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 30, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SunIcon className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -30, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MoonIcon className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            
            <Link
              to="/contact"
              className="text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
      </header>
      
      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
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
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-auto bg-background shadow-xl">
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                            TaskFlow
                          </Link>
                          <button
                            type="button"
                            className="rounded-md p-2 text-muted-foreground hover:bg-accent"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                        
                        <div className="mt-6 flow-root">
                          <div className="-my-6 divide-y divide-border">
                            <div className="space-y-2 py-6">
                              {navLinks.map((item) => (
                                <motion.div
                                  key={item.to}
                                  onClick={() => handleNavClick(item.to)}
                                  className={`relative -mx-3 block rounded-lg px-3 py-2 text-base font-medium cursor-pointer ${
                                    location.pathname === item.to
                                      ? 'text-primary'
                                      : 'text-muted-foreground hover:text-foreground'
                                  }`}
                                  whileHover={{ x: 4 }}
                                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                >
                                  {location.pathname === item.to && (
                                    <motion.span
                                      layoutId="mobileActiveNavLink"
                                      className="absolute inset-0 -z-10 rounded-lg bg-accent/20"
                                      initial={false}
                                      transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                      }}
                                    />
                                  )}
                                  {item.label}
                                </motion.div>
                              ))}
                            </div>
                            
                            <div className="py-6">
                              <div className="flex items-center justify-between px-3 py-2">
                                <span className="text-sm font-medium">Theme</span>
                                <motion.button
                                  type="button"
                                  onClick={toggleTheme}
                                  className="rounded-full p-2 hover:bg-accent transition-colors"
                                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                                  whileTap={{ scale: 0.95 }}
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                >
                                  <AnimatePresence mode="wait">
                                    {theme === 'dark' ? (
                                      <motion.span
                                        key="sun"
                                        initial={{ rotate: -30, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 30, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <SunIcon className="h-5 w-5" />
                                      </motion.span>
                                    ) : (
                                      <motion.span
                                        key="moon"
                                        initial={{ rotate: 30, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -30, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <MoonIcon className="h-5 w-5" />
                                      </motion.span>
                                    )}
                                  </AnimatePresence>
                                </motion.button>
                              </div>
                              
                              <button
                                onClick={() => handleNavClick('/contact')}
                                className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                              >
                                Get Started
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Navbar;

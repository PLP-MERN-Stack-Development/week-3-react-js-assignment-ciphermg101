import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { to: '/about', label: 'About' },
    { to: '/privacy', label: 'Privacy' },
    { to: '/terms', label: 'Terms' },
    { to: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/ciphermg101', icon: 'github' },
    { name: 'X', href: 'https://x.com/chris_waigi', icon: 'x' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/christopher-mbuthia-mboyi', icon: 'linkedin' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <h3 className="text-lg font-semibold text-foreground">PLP Task Manager</h3>
            <p className="text-muted-foreground text-base">
              A simple task management application built with React and Tailwind CSS.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                >
                  <span className="sr-only">{item.name}</span>
                  <i className={`fab fa-${item.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                  Navigation
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
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Documentation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-base text-muted-foreground text-center">
            &copy; {currentYear} PLP Task Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

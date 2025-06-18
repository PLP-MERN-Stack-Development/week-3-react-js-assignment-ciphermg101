import PropTypes from 'prop-types';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

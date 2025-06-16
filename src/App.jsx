import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@context/ThemeContext';
import Layout from '@components/Layout';
import Home from '@pages/home/Home';
import About from '@pages/about/About';
import Contact from '@pages/contact/Contact';
import Posts from '@pages/posts/Posts';
import PostDetail from '@pages/posts/PostDetail';
import TaskManager from '@components/TaskManager';
import NotFound from '@pages/notfound/NotFound';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App; 
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getPosts } from '@/api/posts';
import Card from '@components/Card';
import Button from '@components/Button';
import { SearchIcon, XIcon } from '@heroicons/react/outline';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
  });
  
  useEffect(() => {
    setPagination(prev => ({ ...prev, page: 1 }));
  }, [searchQuery]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { page, limit } = pagination;
        const result = await getPosts({
          _page: page,
          _limit: limit,
          q: searchQuery,
        });
        
        setPosts(result.data);
        setPagination(prev => ({
          ...prev,
          total: result.total,
          totalPages: result.totalPages,
        }));
        setError(null);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load posts. Please try again later.');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => clearTimeout(timer);
  }, [pagination.page, pagination.limit, searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({
        ...prev,
        page: newPage,
      }));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({
      ...prev,
      page: 1,
    }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pagination.page]);
  
  useEffect(() => {
    if (searchInputRef.current && location.state?.focusSearch) {
      searchInputRef.current.focus();
    }
  }, [location.state]);
  
  if (loading && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="relative">
          <div className="h-16 w-16 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-muted-foreground">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Blog Posts
            </h1>
            <p className="text-muted-foreground mt-2">
              Discover the latest articles and updates
            </p>
          </div>
          
          <form 
            onSubmit={handleSearch} 
            className={`relative max-w-md w-full transition-all duration-200 ${
              isSearchFocused ? 'ring-2 ring-primary/30 rounded-lg' : ''
            }`}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search posts by title or content..."
                className="block w-full pl-10 pr-12 py-3 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent focus:outline-none transition-all duration-200"
                aria-label="Search posts"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Clear search"
                >
                  <XIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              )}
            </div>
          </form>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-sm"
              role="alert"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {posts.length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post) => (
              <motion.div key={post.id} variants={item}>
                <Card 
                  hoverable 
                  className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="h-48 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center overflow-hidden">
                    <div className="text-primary/30 text-5xl font-bold">
                      {post.id.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <Card.Body className="flex-grow">
                    <h3 className="text-lg font-semibold mb-2 text-foreground line-clamp-2 leading-tight">
                      {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 text-sm">
                      {post.body}
                    </p>
                  </Card.Body>
                  <Card.Footer className="flex justify-between items-center border-t border-border/50">
                    <span className="text-xs text-muted-foreground">
                      {Math.ceil(post.body.length / 100)} min read
                    </span>
                    <Link 
                      to={`/posts/${post.id}`}
                      className="group inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Read more
                      <svg 
                        className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </Card.Footer>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 border-2 border-dashed border-border/50 rounded-xl"
          >
            <div className="max-w-md mx-auto">
              <svg 
                className="mx-auto h-16 w-16 text-muted-foreground/30" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-foreground">No posts found</h3>
              <p className="mt-2 text-muted-foreground">
                {searchQuery 
                  ? `No posts match your search for "${searchQuery}". Try a different term.`
                  : 'There are no posts available at the moment.'}
              </p>
              {searchQuery && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchQuery('')}
                >
                  Clear search
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {pagination.totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mt-12"
          >
            <nav className="flex items-center gap-2 bg-background/50 backdrop-blur-sm p-2 rounded-full border border-border/50 shadow-sm" aria-label="Pagination">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={pagination.page === 1}
                className="rounded-full w-10 h-10 p-0"
                aria-label="First page"
              >
                &laquo;
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="rounded-full w-10 h-10 p-0"
                aria-label="Previous page"
              >
                &lsaquo;
              </Button>
              
              <div className="flex items-center px-2">
                <span className="text-sm text-foreground/80">
                  Page <span className="font-medium">{pagination.page}</span> of <span className="font-medium">{pagination.totalPages}</span>
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="rounded-full w-10 h-10 p-0"
                aria-label="Next page"
              >
                &rsaquo;
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(pagination.totalPages)}
                disabled={pagination.page === pagination.totalPages}
                className="rounded-full w-10 h-10 p-0"
                aria-label="Last page"
              >
                &raquo;
              </Button>
            </nav>
          </motion.div>
        )}
        
        {loading && posts.length > 0 && (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;

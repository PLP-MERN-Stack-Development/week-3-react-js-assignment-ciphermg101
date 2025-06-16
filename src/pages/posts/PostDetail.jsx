import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getPostById, getPostComments } from '@api/posts';
import Card from '@components/Card';
import Button from '@components/Button';
import { ArrowLeftIcon, ChatBubbleLeftRightIcon, ClockIcon, UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { opacity: 0, y: -20 }
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

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postData = await getPostById(id);
        
        await new Promise(resolve => setTimeout(resolve, 300));
        setPost(postData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError({
          title: 'Post Not Found',
          message: 'The post you are looking for does not exist or may have been removed.',
          action: {
            label: 'Browse All Posts',
            onClick: () => navigate('/posts')
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  useEffect(() => {
    const fetchComments = async () => {
      if (showComments && post) {
        try {
          setCommentsLoading(true);
          const commentsData = await getPostComments(post.id);
      
          await new Promise(resolve => setTimeout(resolve, 500));
          setComments(commentsData);
        } catch (err) {
          console.error('Failed to fetch comments:', err);
          setError(prev => ({
            ...prev,
            title: 'Failed to Load Comments',
            message: 'There was an error loading the comments. Please try again later.'
          }));
        } finally {
          setCommentsLoading(false);
        }
      }
    };

    fetchComments();
  }, [showComments, post]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] space-y-4"
      >
        <div className="relative">
          <div className="h-16 w-16 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-muted-foreground">Loading post...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto p-6"
      >
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-2">{error.title || 'Error'}</h2>
          <p className="mb-6">{error.message || 'An unexpected error occurred.'}</p>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="secondary"
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </Button>
            {error.action && (
              <Button 
                variant="primary"
                onClick={error.action.onClick}
                className="flex items-center gap-2"
              >
                {error.action.label}
                <ArrowLeftIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (!post) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto p-6"
      >
        <div className="text-center py-16 border-2 border-dashed border-border/50 rounded-xl">
          <svg 
            className="mx-auto h-16 w-16 text-muted-foreground/30" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-foreground">Post Not Found</h2>
          <p className="mt-2 text-muted-foreground">The post you're looking for doesn't exist or has been removed.</p>
          <Button 
            variant="primary" 
            className="mt-6"
            onClick={() => navigate('/posts')}
          >
            Browse All Posts
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-8 group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Posts
        </Button>
      </motion.div>

      <motion.article 
        variants={staggerContainer}
        initial={mounted ? "hidden" : false}
        animate="visible"
        className="space-y-8"
      >
        <motion.header variants={fadeInUp} className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <UserIcon className="h-4 w-4" />
              <span>Author ID: {post.userId}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4" />
              <span>Posted {formatDate(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)}</span>
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
          </h1>
          
          <div className="flex flex-wrap gap-2">
            {['React', 'JavaScript', 'Web Dev', 'Tutorial'].map((tag, i) => (
              <span 
                key={i} 
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        <motion.div 
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
          className="prose dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-semibold prose-a:text-primary hover:prose-a:underline-offset-4"
        >
          <p className="text-lg text-muted-foreground">
            {Array(3).fill(post.body).join(' ')}
          </p>
          
          <div className="my-8 p-6 bg-muted/30 rounded-xl border border-border">
            <h3 className="text-lg font-semibold mb-3">Key Takeaways</h3>
            <ul className="space-y-2">
              {[
                'Understanding the core concepts',
                'Practical implementation examples',
                'Best practices and common pitfalls',
                'Advanced techniques and optimization'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-lg text-muted-foreground">
            {Array(2).fill(post.body).join(' ')}
          </p>
        </motion.div>

        <motion.footer 
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="pt-8 border-t border-border/50"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                {post.userId}
              </div>
              <div>
                <p className="font-medium text-foreground">Author Name</p>
                <p className="text-sm text-muted-foreground">Software Developer</p>
              </div>
            </div>
            
            <Button 
              variant={showComments ? 'secondary' : 'outline'}
              onClick={toggleComments}
              disabled={commentsLoading}
              className="group flex-shrink-0"
            >
              <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
              {showComments ? (
                <>
                  Hide Comments
                  {comments.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                      {comments.length}
                    </span>
                  )}
                </>
              ) : 'Show Comments'}
              {commentsLoading && (
                <span className="ml-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              )}
            </Button>
          </div>
        </motion.footer>
      </motion.article>

      <AnimatePresence>
        {showComments && (
          <motion.section 
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: { 
                opacity: { duration: 0.3 },
                height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
              } 
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: { 
                opacity: { duration: 0.2 },
                height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            className="mt-12 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary" />
                Comments
                {comments.length > 0 && (
                  <span className="text-sm font-normal text-muted-foreground">
                    ({comments.length})
                  </span>
                )}
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleComments}
                className="text-muted-foreground hover:text-foreground"
              >
                Hide
              </Button>
            </div>

            {commentsLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="text-muted-foreground">Loading comments...</p>
              </div>
            ) : comments.length > 0 ? (
              <motion.ul 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {comments.map((comment, index) => (
                  <motion.li 
                    key={comment.id}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:border-primary/20 transition-colors">
                      <Card.Body className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                            {comment.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">
                              {comment.name}
                            </h4>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <EnvelopeIcon className="h-3 w-3" />
                              {comment.email}
                            </p>
                          </div>
                        </div>
                        <p className="text-foreground/90 pl-1">
                          {comment.body}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/30">
                          <button className="hover:text-primary transition-colors">
                            Like
                          </button>
                          <button className="hover:text-primary transition-colors">
                            Reply
                          </button>
                          <span className="ml-auto">
                            {formatDate(Date.now() - Math.floor(Math.random() * 24) * 60 * 60 * 1000 * (index + 1))}
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 border-2 border-dashed border-border/50 rounded-xl"
              >
                <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No comments yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Be the first to share your thoughts on this post.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    // Scroll to comment form if we had one
                    document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Leave a Comment
                </Button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              id="comment-form"
              className="mt-12 pt-8 border-t border-border/50"
            >
              <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-muted-foreground mb-1">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all"
                    placeholder="Share your thoughts..."
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="primary"
                    className="px-6"
                    onClick={() => { 

                      alert('Comment submitted!');
                    }}
                  >
                    Post Comment
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PostDetail;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from '@components/Button';
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

const TeamMember = ({ member, index }) => {
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
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full hoverable">
        <div className="h-48 bg-muted/30 flex items-center justify-center">
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-32 h-32 rounded-full object-cover border-4 border-background shadow-lg"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
          <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
          <p className="text-muted-foreground">{member.bio}</p>
          <div className="mt-4 flex space-x-3">
            {member.socials?.map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.name}
              >
                <span className="sr-only">{social.name}</span>
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const About = () => {
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

  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Frontend Architect',
      bio: 'Passionate about creating beautiful and intuitive user experiences with React and modern web technologies.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
      socials: [
        { name: 'Twitter', url: '#', icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        )},
        { name: 'GitHub', url: '#', icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        )},
        { name: 'LinkedIn', url: '#', icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        )},
      ]
    },
    {
      name: 'Taylor Chen',
      role: 'UX/UI Designer',
      bio: 'Designing intuitive and delightful user experiences that solve real problems and create meaningful connections.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
      socials: [
        { name: 'Dribbble', url: '#', icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943.395-6.979 2.256 1.726-2.089 2.195-3.34 3.126-3.34 1.806 0 3.063 2.102 3.853 1.084zm-19.77 1.324c.171-1.097 1.409-1.067 1.933-.064-1.994 2.742-3.903 4.326-6.227 5.818.799-2.738 2.333-5.754 4.294-5.754zm10.012-.002c-1.913 0-2.35 2.853-4.009 4.294-1.818 1.58-3.204 1.145-4.007 2.183-1.068 1.374.34 2.285 1.5 2.169 2.189-.22 4.208-1.608 5.479-3.5 1.295-1.944 1.813-3.5 1.037-3.146zm-11.771.274c-1.294-1.095-.852-2.298-.696-2.782.246-.761.727-2.481 3.349-2.429 1.013.02 1.528.462 1.528.462s-2.204-.154-2.198 2.623c0 .416.104.763.316 1.022-.537-.129-1.925-.31-2.299-.896zm18.198 2.416c-.98.763-1.902.583-2.359-.486-.416-.983.022-2.193 1.115-2.373 1.666-.278 1.791 2.147 1.244 2.859z" />
          </svg>
        )},
        { name: 'Behance', url: '#', icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.563-2.01 2.5-3.726 2.5-3.538 0-4-3-4.042-3.5h4.165l.201.5c.277.795 1.1 1.5 1.6 1.5 1.333 0 1.5-.5 1.5-1.5h-5c0-3 1.5-5 5-5 1.5 0 3 .5 4 1.5 1 1 1 2 1 2s-1 1.5-2 2zm-7.5 1.5c.03-.5.09-1 .21-1.5h-2.04c.06.5.13 1 .33 1.5h1.5zm-1.5-3.5c0-1.5.5-4 3-4 2.5 0 3 2.5 3 4h-6zm-6.5-2.5h-2.5v-1.5h2.5v-2.5h-3.5v-1.5h3.5v-2.5h-4.5v-1.5h5.5v9zm-3-4h-2v1.5h2v-1.5z" />
          </svg>
        )},
      ]
    },
    {
      name: 'Jordan Williams',
      role: 'Backend Engineer',
      bio: 'Building scalable and efficient backend systems that power seamless user experiences.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
      socials: [
        { name: 'GitHub', url: '#', icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        )},
        { name: 'Twitter', url: '#', icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        )},
      ]
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Active Users' },
    { value: '1M+', label: 'Tasks Completed' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Support' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
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
              Our Story
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              Building the Future of
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> Productivity</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              We&apos;re on a mission to help individuals and teams achieve more by creating intuitive, powerful tools that make task management effortless.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Journey</h2>
              <p className="text-muted-foreground mb-6">
                Founded in 2023, our journey began with a simple idea: to create a task management tool that truly understands people's needs. 
                Since then, we've grown into a passionate team dedicated to building tools that make a real difference.
              </p>
              <p className="text-muted-foreground mb-6">
                Our platform is built on the principles of simplicity, efficiency, and user-centric design. We believe that the right tools can transform 
                the way people work and help them achieve their full potential.
              </p>
              <motion.div 
                variants={fadeInUp}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-muted/50">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-1/3 h-1/3 rounded-xl overflow-hidden border-4 border-background shadow-xl">
                  <div className="aspect-square bg-[url('https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80')] bg-cover bg-center" />
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Journey
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2023, our journey began with a simple question: Why is task management so complicated? 
                  We set out to create a solution that combines powerful features with an intuitive interface.
                </p>
                <p>
                  Today, our platform helps thousands of users stay organized and productive. We&apos;re proud of how far we&apos;ve come, 
                  but we&apos;re even more excited about the future.
                </p>
                <p>
                  Our team is constantly innovating and improving, always with one goal in mind: to help you do your best work.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-card p-4 rounded-xl border border-border"
                  >
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-foreground mb-12"
          >
            Why Choose PLP Task Manager?
          </motion.h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
            {
              title: 'Simple & Intuitive',
              description: 'An easy-to-use interface that lets you focus on your tasks without distractions.',
              icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
            },
            {
              title: 'Powerful Features',
              description: 'All the tools you need to manage your tasks effectively, including due dates, priorities, and more.',
              icon: 'M13 10V3L4 14h7v7l9-11h-7z',
            },
            {
              title: 'Cross-Platform',
              description: 'Access your tasks from anywhere, on any device with an internet connection.',
              icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
            },
          ].map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow h-full">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-3">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl my-12">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who are already managing their tasks with PLP Task Manager.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/tasks">
              <Button variant="primary" size="lg">
                Try It Free
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

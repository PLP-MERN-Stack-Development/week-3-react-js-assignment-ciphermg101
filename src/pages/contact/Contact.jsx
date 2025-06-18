import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@contexts/ThemeContext';
import Button from '@components/Button';
import Card from '@components/Card';
import {
  FaEnvelope as FiMail,
  FaPhone as FiPhone,
  FaMapMarkerAlt as FiMapPin,
  FaClock as FiClock,
  FaTwitter as FiTwitter,
  FaFacebookF as FiFacebook,
  FaLinkedinIn as FiLinkedin,
  FaInstagram as FiInstagram,
  FaPaperPlane as FiSend,
  FaCheck as FiCheck
} from 'react-icons/fa';

const Contact = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const inputClass =
    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 bg-input text-foreground border-border placeholder:text-muted-foreground';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-xl max-w-2xl mx-auto text-muted-foreground">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-green-100 dark:bg-green-900/30">
                    <FiCheck className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{t('contact.form.success.title')}</h3>
                  <p className="mb-8 max-w-md mx-auto text-muted-foreground">
                    {t('contact.form.success.message')}
                  </p>
                  <Button variant="primary" onClick={() => setSubmitStatus(null)}>
                    {t('contact.form.success.another')}
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold mb-8">{t('contact.form.title')}</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          {t('contact.form.fields.name')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          {t('contact.form.fields.email')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        {t('contact.form.fields.subject')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        {t('contact.form.fields.message')} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder={t('contact.form.fields.messagePlaceholder')}
                        className={inputClass}
                      />
                    </div>
                    <div className="flex items-center">
                      <Button type="submit" variant="primary" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></span>
                            {t('contact.form.sending')}
                          </>
                        ) : (
                          <>
                            <FiSend className="w-4 h-4" />
                            {t('contact.form.fields.submit')}
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </Card>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">{t('contact.info.title')}</h2>
              <p className="mb-6 text-muted-foreground">{t('contact.info.description')}</p>

              {[
                {
                  icon: <FiMail />,
                  label: t('contact.info.email'),
                  content: <a href="mailto:info@plptaskmanager.com" className="text-primary hover:underline">info@plptaskmanager.com</a>,
                },
                {
                  icon: <FiPhone />,
                  label: t('contact.info.call'),
                  content: <a href="tel:+254700000000" className="text-muted-foreground hover:text-primary">+254 700 000000</a>,
                },
                {
                  icon: <FiMapPin />,
                  label: t('contact.info.visit'),
                  content: (
                    <address className="not-italic text-muted-foreground">
                      {t('contact.info.location', { joinArrays: '\n' }).split('\n').map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </address>
                  ),
                },
                {
                  icon: <FiClock />,
                  label: t('contact.info.hours'),
                  content: (
                    <p className="whitespace-pre-line text-muted-foreground">
                      {t('contact.info.hoursText', { joinArrays: '\n' })}
                    </p>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center mt-1 bg-accent text-accent-foreground">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{item.label}</h3>
                    {item.content}
                  </div>
                </div>
              ))}
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-medium mb-4">{t('contact.social.title')}</h3>
              <p className="mb-4 text-muted-foreground">{t('contact.social.description')}</p>
              <div className="flex space-x-3">
                {[
                  { name: 'Twitter', icon: <FiTwitter />, url: 'https://twitter.com/plptaskmanager' },
                  { name: 'Facebook', icon: <FiFacebook />, url: 'https://facebook.com/plptaskmanager' },
                  { name: 'LinkedIn', icon: <FiLinkedin />, url: 'https://linkedin.com/company/plptaskmanager' },
                  { name: 'Instagram', icon: <FiInstagram />, url: 'https://instagram.com/plptaskmanager' },
                ].map(({ name, icon, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="h-10 w-10 rounded-full flex items-center justify-center bg-accent text-accent-foreground hover:bg-primary hover:text-white transition-colors"
                  >
                    {React.cloneElement(icon, { className: 'w-5 h-5' })}
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

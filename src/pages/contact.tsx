import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@clawncore.com',
    href: 'mailto:info@clawncore.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+263-XXX-XXXX',
    href: 'tel:+263XXXXXXXXX',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Harare, Zimbabwe',
    href: null,
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon-Fri 8:00 AM - 5:00 PM (CAT)',
    href: null,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Contact Us"
        description="Get in touch with ClawnCore Multitech. Contact our team for inquiries about smart agriculture, cybersecurity, cloud, AI, and analytics solutions."
        keywords={[
          'contact ClawnCore',
          'technology solutions inquiry',
          'smart agriculture consultation',
          'cybersecurity assessment',
          'cloud hosting inquiry',
          'AI solutions consultation',
        ]}
        ogImage="/og-contact.png"
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs items={[{ name: 'Contact', url: '/contact' }]} className="mb-8" />

            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 dark:text-slate-300">
                Have a question or ready to get started? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="pb-20 sm:pb-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="bg-white dark:bg-cc-card rounded-2xl p-8 shadow-lg">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-slate-400 mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Company
                        </label>
                        <Input
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          placeholder="Your company"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+263-XXX-XXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about your needs..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-nvidia-500 hover:bg-nvidia-600 text-white font-bold"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <div key={info.label} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-nvidia-500/10 flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-6 w-6 text-nvidia-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">
                            {info.label}
                          </p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-lg font-medium hover:text-nvidia-500 transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-lg font-medium">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-nvidia-500/10 to-nvidia-500/5 border border-nvidia-500/20">
                  <h3 className="text-lg font-bold mb-3">Ready to Get Started?</h3>
                  <p className="text-gray-600 dark:text-slate-400 mb-4">
                    Schedule a free consultation to discuss how ClawnCore can help your organization.
                  </p>
                  <a href="/get-started">
                    <Button className="bg-nvidia-500 hover:bg-nvidia-600 text-white font-bold">
                      Schedule Consultation
                    </Button>
                  </a>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-cc-card border border-gray-200 dark:border-white/10">
                  <h3 className="text-lg font-bold mb-3">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://twitter.com/clawncore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-nvidia-500 hover:text-white transition-colors"
                    >
                      𝕏
                    </a>
                    <a
                      href="https://linkedin.com/company/clawncore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-nvidia-500 hover:text-white transition-colors"
                    >
                      in
                    </a>
                    <a
                      href="https://facebook.com/clawncore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-nvidia-500 hover:text-white transition-colors"
                    >
                      f
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}

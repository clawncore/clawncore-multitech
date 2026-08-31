import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Github, Youtube } from 'lucide-react';
import { ContactAccent } from './3d/ContactAccent';

export function Contact() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    serviceInterest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, serviceInterest: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simple validation
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Create a clean data object without empty optional fields
      const cleanData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        message: formData.message,
        ...(formData.company && { company: formData.company }),
        ...(formData.serviceInterest && { serviceInterest: formData.serviceInterest }),
      };

      // Submit to Supabase
      const { error } = await supabase.from('contacts').insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        message: formData.message,
        ...(formData.company && { company: formData.company }),
        ...(formData.serviceInterest && { service_interest: formData.serviceInterest }),
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for your interest. We'll get back to you soon.",
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        serviceInterest: '',
        message: '',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <ContactAccent />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your business with intelligent technology solutions? Let's start the conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                We're here to help you navigate the future of technology. Reach out to discuss your project
                requirements or schedule a consultation.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Mail className="text-slate-900" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Email Us</p>
                  <p className="text-muted-foreground">clawncore@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center">
                  <Phone className="text-slate-900" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Call Us</p>
                  <p className="text-muted-foreground">+91 8790813536</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <MapPin className="text-slate-900" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Visit Us</p>
                  <p className="text-muted-foreground">
                    Andhra Pradesh<br />India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 pt-6">
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-slate-900 transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-slate-900 transition-colors"
                data-testid="link-twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-slate-900 transition-colors"
                data-testid="link-github"
              >
                <Github size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-slate-900 transition-colors"
                data-testid="link-youtube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-2xl border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    data-testid="input-firstName"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    data-testid="input-lastName"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  data-testid="input-email"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                  data-testid="input-company"
                />
              </div>

              <div>
                <label htmlFor="serviceInterest" className="block text-sm font-medium mb-2">
                  Service Interest
                </label>
                <Select onValueChange={handleSelectChange} value={formData.serviceInterest || ''}>
                  <SelectTrigger id="serviceInterest" data-testid="select-serviceInterest">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drone">Drone Technology</SelectItem>
                    <SelectItem value="agriculture">Agriculture Solutions</SelectItem>
                    <SelectItem value="cloud">Cloud Computing</SelectItem>
                    <SelectItem value="ai">Clawn AI</SelectItem>
                    <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="mobile">Mobile Development</SelectItem>
                    <SelectItem value="analytics">Data Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your project requirements..."
                  data-testid="textarea-message"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-600 text-slate-900"
                disabled={isSubmitting}
                data-testid="button-submit-contact"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Prefer to talk directly?{' '}
                <button
                  onClick={() => navigate('/get-started')}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Schedule a consultation
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useRoute, useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/useAuth';

const serviceData = {
  drone: {
    title: 'Drone Technology',
    icon: '🚁',
    description: 'Advanced UAV solutions for surveillance, agriculture, and commercial applications with AI-powered automation.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    features: [
      'Autonomous flight systems',
      'Real-time data transmission',
      'AI-powered object detection',
      'Weather-resistant design',
      'Long-range capabilities',
      'Custom payload integration'
    ],
    useCases: [
      'Agricultural monitoring and crop analysis',
      'Infrastructure inspection and maintenance',
      'Security and surveillance operations',
      'Emergency response and rescue missions',
      'Environmental monitoring and research'
    ]
  },
  agriculture: {
    title: 'Agriculture Solutions',
    icon: '🌱',
    description: 'Smart farming technologies including precision agriculture, crop monitoring, and yield optimization systems.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    features: [
      'Precision farming systems',
      'Crop health monitoring',
      'Automated irrigation control',
      'Yield prediction analytics',
      'Soil composition analysis',
      'Weather integration'
    ],
    useCases: [
      'Crop yield optimization',
      'Resource management and conservation',
      'Pest and disease detection',
      'Automated harvesting systems',
      'Supply chain optimization'
    ]
  },
  cloud: {
    title: 'Cloud Computing',
    icon: '☁️',
    description: 'Scalable cloud infrastructure, migration services, and multi-cloud management solutions.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    features: [
      'Multi-cloud architecture',
      'Auto-scaling capabilities',
      'Disaster recovery planning',
      'Security compliance',
      'Cost optimization',
      '24/7 monitoring'
    ],
    useCases: [
      'Enterprise application migration',
      'Data storage and backup',
      'Development and testing environments',
      'Content delivery networks',
      'Serverless computing solutions'
    ]
  },
  'clawn-ai': {
    title: 'Clawn AI Platform',
    icon: '🧠',
    description: 'Proprietary AI platform for machine learning, natural language processing, and predictive analytics.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    features: [
      'Machine learning models',
      'Natural language processing',
      'Computer vision capabilities',
      'Predictive analytics',
      'Automated decision making',
      'Custom AI training'
    ],
    useCases: [
      'Business process automation',
      'Customer service chatbots',
      'Predictive maintenance',
      'Fraud detection systems',
      'Personalized recommendations'
    ]
  },
  cybersecurity: {
    title: 'Cybersecurity',
    icon: '🛡️',
    description: 'Comprehensive security solutions including threat detection, risk assessment, and compliance management.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    features: [
      'Threat detection and response',
      'Vulnerability assessments',
      'Compliance management',
      'Incident response planning',
      'Security awareness training',
      '24/7 monitoring'
    ],
    useCases: [
      'Network security management',
      'Data protection and privacy',
      'Identity and access management',
      'Regulatory compliance',
      'Security incident response'
    ]
  },
  mobile: {
    title: 'Mobile Development',
    icon: '📱',
    description: 'Cross-platform mobile applications with native performance and intuitive user experiences.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    features: [
      'Cross-platform development',
      'Native performance',
      'Cloud integration',
      'Offline functionality',
      'Push notifications',
      'Analytics integration'
    ],
    useCases: [
      'E-commerce applications',
      'Enterprise productivity apps',
      'Social networking platforms',
      'Educational applications',
      'Healthcare management systems'
    ]
  },
  analytics: {
    title: 'Data Analytics',
    icon: '📊',
    description: 'Business intelligence solutions, data visualization, and advanced analytics for informed decision-making.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    features: [
      'Real-time dashboards',
      'Predictive modeling',
      'Data visualization',
      'Custom reporting',
      'Machine learning insights',
      'API integrations'
    ],
    useCases: [
      'Business performance monitoring',
      'Customer behavior analysis',
      'Financial forecasting',
      'Operational optimization',
      'Market trend analysis'
    ]
  },
  iot: {
    title: 'IoT Solutions',
    icon: '🌐',
    description: 'Connected device ecosystems and smart automation for industrial and commercial applications.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    features: [
      'Device connectivity',
      'Real-time monitoring',
      'Automated controls',
      'Data collection',
      'Remote management',
      'Integration capabilities'
    ],
    useCases: [
      'Smart building systems',
      'Industrial automation',
      'Asset tracking',
      'Environmental monitoring',
      'Predictive maintenance'
    ]
  }
};

export default function ServiceDetail() {
  const [match, params] = useRoute('/service/:serviceId');
  const [, navigate] = useLocation();
  const { openLoginModal } = useAuth();

  if (!match || !params?.serviceId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const service = serviceData[params.serviceId as keyof typeof serviceData];

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-6 sm:mb-8">
            <Button variant="ghost" asChild className="text-blue-600 hover:text-blue-600">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl sm:text-2xl">{service.icon}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-blue-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                    {service.title}
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-600 text-slate-900"
                  onClick={() => navigate('/get-started')}
                >
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Schedule Demo
                </Button>
              </div>
            </div>

            <div className="rounded-xl sm:rounded-2xl overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features & Use Cases */}
      <section className="py-14 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {service.useCases.map((useCase, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{useCase}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Ready to Transform Your Business?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's discuss how our {service.title.toLowerCase()} solutions can help your organization achieve its goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-600 text-slate-900"
                onClick={() => navigate('/get-started')}
              >
                Contact Us Today
              </Button>
              <Button variant="outline" size="lg" onClick={openLoginModal}>
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
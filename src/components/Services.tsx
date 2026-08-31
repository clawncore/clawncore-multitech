import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function ServiceCard({ service }: { service: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group p-4 md:p-6 bg-card rounded-2xl border border-border ${service.hoverColor} transition-all duration-300 shadow-sm hover:shadow-xl`}
    >
      <div
        style={{ transform: "translateZ(30px)" }}
        className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform`}
      >
        <span className="text-slate-900 text-lg md:text-xl">{service.icon}</span>
      </div>
      <h3 style={{ transform: "translateZ(20px)" }} className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{service.title}</h3>
      <p style={{ transform: "translateZ(10px)" }} className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">{service.description}</p>
      <div style={{ transform: "translateZ(20px)" }}>
        <Button
          variant="ghost"
          size="sm"
          className={`${service.textColor} hover:${service.textColor}/80 font-medium text-xs md:text-sm p-0 h-auto`}
          asChild
        >
          <Link href={`/service/${service.id}`} data-testid={`link-service-${service.id}`}>
            Learn More <ArrowRight className="ml-1 md:ml-2 h-3 w-3" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

const services = [
  {
    id: 'drone',
    icon: '🚁',
    title: 'Drone Technology',
    description: 'Advanced UAV solutions for surveillance, agriculture, and commercial applications with AI-powered automation.',
    color: 'from-blue-600 to-cyan-500',
    hoverColor: 'hover:border-blue-300',
    textColor: 'text-blue-600'
  },
  {
    id: 'agriculture',
    icon: '🌱',
    title: 'Agriculture Solutions',
    description: 'Smart farming technologies including precision agriculture, crop monitoring, and yield optimization systems.',
    color: 'from-pink-600 to-pink-800',
    hoverColor: 'hover:border-pink-600/50',
    textColor: 'text-pink-600'
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud Computing',
    description: 'Scalable cloud infrastructure, migration services, and multi-cloud management solutions.',
    color: 'from-blue-600 to-blue-800',
    hoverColor: 'hover:border-blue-600/50',
    textColor: 'text-blue-600'
  },
  {
    id: 'clawn-ai',
    icon: '🧠',
    title: 'Clawn AI Platform',
    description: 'Proprietary AI platform for machine learning, natural language processing, and predictive analytics.',
    color: 'from-blue-600 via-pink-600 to-blue-600',
    hoverColor: 'hover:border-blue-300',
    textColor: 'text-blue-600'
  },
  {
    id: 'cybersecurity',
    icon: '🛡️',
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions including threat detection, risk assessment, and compliance management.',
    color: 'from-pink-600 to-pink-800',
    hoverColor: 'hover:border-pink-600/50',
    textColor: 'text-pink-600'
  },
  {
    id: 'mobile',
    icon: '📱',
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications with native performance and intuitive user experiences.',
    color: 'from-blue-600 to-blue-800',
    hoverColor: 'hover:border-blue-600/50',
    textColor: 'text-blue-600'
  },
  {
    id: 'analytics',
    icon: '📊',
    title: 'Data Analytics',
    description: 'Business intelligence solutions, data visualization, and advanced analytics for informed decision-making.',
    color: 'from-blue-600 to-cyan-500',
    hoverColor: 'hover:border-blue-300',
    textColor: 'text-blue-600'
  },
  {
    id: 'iot',
    icon: '🌐',
    title: 'IoT Solutions',
    description: 'Connected device ecosystems and smart automation for industrial and commercial applications.',
    color: 'from-pink-600 to-pink-800',
    hoverColor: 'hover:border-pink-600/50',
    textColor: 'text-pink-600'
  },
];

export function Services() {
  return (
    <section id="services" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions designed to accelerate your digital transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {services.map((service) => (
            <div key={service.id} style={{ perspective: "1000px" }}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
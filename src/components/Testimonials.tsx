import { Star } from 'lucide-react';

const testimonials = [
  {
    role: 'Leading Agricultural Company',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50',
    content: "ClawnCore's AI solutions transformed our agricultural operations. The drone technology increased our crop yield by 30% while reducing operational costs.",
    rating: 5
  },
  {
    role: 'Technology Solutions Provider',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50',
    content: "The cybersecurity solutions provided by ClawnCore gave us complete peace of mind. Their 24/7 monitoring has prevented multiple security threats.",
    rating: 5
  },
  {
    role: 'Cloud Services Enterprise',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50',
    content: "ClawnCore's cloud migration strategy was flawless. We reduced infrastructure costs by 40% while improving performance and scalability.",
    rating: 5
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">Real feedback from companies we've helped transform</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-card rounded-xl border border-border">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 text-sm">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.role}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm" data-testid={`text-name-${index}`}>
                      Client
                    </p>
                    <p className="text-xs text-muted-foreground" data-testid={`text-role-${index}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
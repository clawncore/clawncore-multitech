import { Globe, Leaf, Lightbulb, Handshake, Star, Shield, Rocket, Users as UsersIcon } from 'lucide-react';
import { SubtleNodes } from './3d/SubtleNodes';

export function VisionMission() {
  return (
    <section id="vision" className="py-20 relative overflow-hidden">
      <SubtleNodes />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Vision */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the global leader in technology solutions, empowering businesses to achieve
                growth through innovation, automation, and sustainable practices.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <Globe className="text-blue-600 text-2xl mb-3" size={24} />
                <h4 className="font-semibold mb-2">Global Impact</h4>
                <p className="text-sm text-muted-foreground">Creating solutions that transform industries worldwide</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <Leaf className="text-pink-600 text-2xl mb-3" size={24} />
                <h4 className="font-semibold mb-2">Sustainability</h4>
                <p className="text-sm text-muted-foreground">Building eco-friendly technology for a better future</p>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To deliver reliable technology solutions that solve complex business challenges, drive digital
                transformation, and create meaningful value for our clients and communities.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <Lightbulb className="text-blue-600 text-2xl mb-3" size={24} />
                <h4 className="font-semibold mb-2">Innovation</h4>
                <p className="text-sm text-muted-foreground">Pioneering breakthrough technologies and solutions</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <Handshake className="text-blue-600 text-2xl mb-3" size={24} />
                <h4 className="font-semibold mb-2">Partnership</h4>
                <p className="text-sm text-muted-foreground">Building lasting relationships with clients and stakeholders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Core Values</h3>
            <p className="text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-card rounded-xl border border-border hover:border-blue-300 transition-colors">
              <Star className="text-blue-600 text-3xl mb-4 mx-auto" size={32} />
              <h4 className="font-semibold mb-2">Excellence</h4>
              <p className="text-sm text-muted-foreground">Delivering the highest quality in everything we create</p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border hover:border-pink-600/50 transition-colors">
              <Shield className="text-pink-600 text-3xl mb-4 mx-auto" size={32} />
              <h4 className="font-semibold mb-2">Integrity</h4>
              <p className="text-sm text-muted-foreground">Operating with transparency, honesty, and ethical standards</p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border hover:border-blue-600/50 transition-colors">
              <Rocket className="text-blue-600 text-3xl mb-4 mx-auto" size={32} />
              <h4 className="font-semibold mb-2">Innovation</h4>
              <p className="text-sm text-muted-foreground">Constantly pushing boundaries and exploring new possibilities</p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border hover:border-blue-300 transition-colors">
              <UsersIcon className="text-blue-600 text-3xl mb-4 mx-auto" size={32} />
              <h4 className="font-semibold mb-2">Collaboration</h4>
              <p className="text-sm text-muted-foreground">Working together to achieve extraordinary results</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

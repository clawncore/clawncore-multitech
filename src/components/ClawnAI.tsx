import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Languages, Eye } from 'lucide-react';
import { NeuralCore } from './3d/NeuralCore';

export function ClawnAI() {
  const [, navigate] = useLocation();

  return (
    <section id="clawn-ai" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Clawn AI Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our proprietary AI platform delivers automation and data-driven insights across all industries.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold">Automation at Scale</h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="text-slate-900" size={16} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Machine Learning Models</h4>
                  <p className="text-muted-foreground text-sm">Advanced ML algorithms for predictive analytics and pattern recognition.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Languages className="text-slate-900" size={16} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Natural Language Processing</h4>
                  <p className="text-muted-foreground text-sm">Sophisticated text analysis and language understanding capabilities.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Eye className="text-slate-900" size={16} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Computer Vision</h4>
                  <p className="text-muted-foreground text-sm">Image recognition and analysis for automated visual inspection.</p>
                </div>
              </div>
            </div>

            <Button
              className="bg-blue-600 hover:bg-blue-600 text-slate-900"
              data-testid="button-explore-ai"
              onClick={() => navigate('/get-started')}
            >
              Explore Clawn AI
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-2xl">
            <NeuralCore />
          </div>
        </div>

        {/* AI Use Cases */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="text-blue-600 text-2xl mb-4">🏭</div>
            <h4 className="font-semibold mb-2">Industrial Automation</h4>
            <p className="text-sm text-muted-foreground">
              Optimize manufacturing processes with automation and predictive maintenance.
            </p>
          </div>
          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="text-pink-600 text-2xl mb-4">🏥</div>
            <h4 className="font-semibold mb-2">Healthcare Analytics</h4>
            <p className="text-sm text-muted-foreground">
              Diagnostic tools and patient data analysis for improved healthcare outcomes.
            </p>
          </div>
          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="text-blue-600 text-2xl mb-4">📈</div>
            <h4 className="font-semibold mb-2">Business Intelligence</h4>
            <p className="text-sm text-muted-foreground">
              Transform raw data into actionable insights with advanced analytics and reporting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
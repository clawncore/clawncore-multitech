import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Lock, Play } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { MinimalBackground } from '@/components/3d/MinimalBackground';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Access',
    price: 9.99,
    currency: 'USD',
    features: ['Access to all demo videos', 'HD quality', 'No download'],
  },
  {
    id: 'premium',
    name: 'Premium Access',
    price: 19.99,
    currency: 'USD',
    features: ['Access to all demo videos', '4K quality', 'Download allowed', 'Early access to new content'],
  }
];

export default function Subscription() {
  const [, navigate] = useLocation();
  const { isAuthenticated, openLoginModal } = useAuth();
  // Mock the missing properties for now
  const subscribe = async (planId: string) => { console.log('Subscribe to', planId); return true; };
  const isSubscribed = false;
  const subscriptionPlan: SubscriptionPlan | null = null;
  const loading = false;
  const [subscribing, setSubscribing] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (!isAuthenticated) {
      // Open login modal instead of redirecting
      openLoginModal();
      return;
    }

    setSubscribing(planId);
    const success = await subscribe(planId);
    setSubscribing(null);

    if (success) {
      toast({
        title: "Subscription Successful!",
        description: "You now have access to all demo videos.",
      });
      navigate('/');
    } else {
      toast({
        title: "Subscription Failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <MinimalBackground />
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-pink-50 dark:from-blue-600 dark:to-pink-950">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Video Access Subscription
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Unlock premium access to all our technology demonstration videos.
            Subscribe to a plan that fits your needs.
          </p>

          {isSubscribed && subscriptionPlan && (
            <div className="max-w-2xl mx-auto">
              <Card className="border-green-500 border-2">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <Lock className="h-8 w-8 text-green-500 mr-2" />
                    <h3 className="text-2xl font-bold text-green-500">Already Subscribed</h3>
                  </div>
                  <p className="text-center mb-4">
                    You currently have <span className="font-semibold">{(subscriptionPlan as SubscriptionPlan).name}</span> access.
                    Enjoy all our premium video content!
                  </p>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => navigate('/')}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Videos Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-muted-foreground">
              All plans include access to our premium video content
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {subscriptionPlans.map((plan, index) => (
                <Card key={index} className="relative">
                  {plan.id === 'premium' && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-slate-900">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.currency.toLowerCase()}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${plan.id === 'premium' ? 'bg-blue-600 hover:bg-blue-600' : ''}`}
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={isSubscribed && subscriptionPlan && (subscriptionPlan as SubscriptionPlan).id === plan.id || subscribing === plan.id}
                    >
                      {subscribing === plan.id ? (
                        'Processing...'
                      ) : isSubscribed && subscriptionPlan && (subscriptionPlan as SubscriptionPlan).id === plan.id ? (
                        'Current Plan'
                      ) : (
                        'Subscribe Now'
                      )}
                    </Button>

                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Access Info */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You'll Get
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our premium video content showcases cutting-edge technology demonstrations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-600 dark:bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-blue-600 dark:text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Technology Demos</h3>
                <p className="text-muted-foreground">
                  In-depth demonstrations of our latest technology solutions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exclusive Content</h3>
                <p className="text-muted-foreground">
                  Access to premium content not available to the public
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Regular Updates</h3>
                <p className="text-muted-foreground">
                  New content added monthly with the latest innovations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
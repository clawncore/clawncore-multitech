import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: "ClawnCore Introduction",
    description: "Learn about our comprehensive technology solutions",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    videoSrc: "#"
  },
  {
    id: 2,
    title: "Drone Technology Showcase",
    description: "See our advanced UAV solutions in action",
    thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    videoSrc: "#"
  },
  {
    id: 3,
    title: "Agriculture Solutions Demo",
    description: "Smart farming technologies for modern agriculture",
    thumbnail: "https://images.unsplash.com/photo-1515704089429-546076d4d2c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    videoSrc: "#"
  },
  {
    id: 4,
    title: "Cloud Computing Platform",
    description: "Scalable infrastructure for your business",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    videoSrc: "#"
  }
];

export function Videos() {
  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuth();

  const handleGetStartedClick = () => {
    navigate('/get-started');
  };

  return (
    <section className="py-16 md:py-20 bg-muted/30" id="videos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Demo Videos
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch our technology in action and see how ClawnCore can transform your business
          </p>

          {!isAuthenticated && (
            <div className="mt-6">
              <Button
                onClick={handleGetStartedClick}
                className="bg-blue-600 hover:bg-blue-600"
              >
                Get Started to Access Videos
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Sign in to view our demo videos
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {videos.map((video) => (
            <div key={video.id} className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-2">{video.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base mb-4">{video.description}</p>
              </div>

              {isAuthenticated ? (
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <VideoPlayer
                    videoSrc={video.videoSrc}
                    thumbnailSrc={video.thumbnail}
                    title={video.title}
                  />
                </div>
              ) : (
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <div className="relative aspect-video bg-muted rounded-lg flex items-center justify-center">
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover rounded-lg opacity-50"
                      />
                    ) : (
                      <div className="bg-muted w-full h-full rounded-lg" />
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 rounded-lg p-4">
                      <Lock className="h-8 w-8 md:h-12 md:w-12 text-slate-900 mb-2 md:mb-4" />
                      <p className="text-slate-900 text-base md:text-lg font-medium text-center px-2">
                        Sign in to view this video
                      </p>
                      <Button
                        onClick={handleGetStartedClick}
                        className="mt-3 md:mt-4 bg-blue-600 hover:bg-blue-600 text-sm md:text-base"
                        size="sm"
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
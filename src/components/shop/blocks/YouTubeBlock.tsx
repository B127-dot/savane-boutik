import { motion } from 'framer-motion';
import { Play, Youtube } from 'lucide-react';
import { useState } from 'react';

interface YouTubeBlockProps {
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  animationsEnabled?: boolean;
  config?: {
    title?: string;
    subtitle?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
  };
}

const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const YouTubeBlock = ({
  title: propTitle,
  subtitle: propSubtitle,
  videoUrl: propVideoUrl,
  thumbnailUrl: propThumbnailUrl,
  animationsEnabled = true,
  config
}: YouTubeBlockProps) => {
  // Prioritize config values over direct props
  const title = config?.title ?? propTitle ?? 'Découvrez notre histoire';
  const subtitle = config?.subtitle ?? propSubtitle ?? 'Une vidéo vaut mille mots';
  const videoUrl = config?.videoUrl ?? propVideoUrl ?? '';
  const thumbnailUrl = config?.thumbnailUrl ?? propThumbnailUrl;

  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = extractVideoId(videoUrl);
  
  const defaultThumbnail = videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : '/placeholder.svg';

  const MotionDiv = animationsEnabled ? motion.div : 'div' as any;

  if (!videoId) {
    return (
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <Youtube className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Configurez l'URL de la vidéo YouTube</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-red-500 mb-3">
              <Youtube className="w-6 h-6" />
            </div>
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground mt-2">{subtitle}</p>
            )}
          </div>
        )}

        <MotionDiv
          initial={animationsEnabled ? { opacity: 0, scale: 0.95 } : undefined}
          whileInView={animationsEnabled ? { opacity: 1, scale: 1 } : undefined}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="YouTube video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div 
                className="relative w-full h-full cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <img 
                  src={thumbnailUrl || defaultThumbnail}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-xl"
                  >
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default YouTubeBlock;

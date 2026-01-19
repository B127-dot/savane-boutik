import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface InstagramPost {
  id: string;
  imageUrl: string;
  link?: string;
}

interface InstagramGalleryBlockProps {
  title?: string;
  instagramHandle?: string;
  posts?: InstagramPost[];
  animationsEnabled?: boolean;
  config?: {
    title?: string;
    instagramHandle?: string;
    posts?: InstagramPost[];
  };
}

const DEFAULT_POSTS: InstagramPost[] = [
  { id: '1', imageUrl: '/placeholder.svg' },
  { id: '2', imageUrl: '/placeholder.svg' },
  { id: '3', imageUrl: '/placeholder.svg' },
  { id: '4', imageUrl: '/placeholder.svg' },
  { id: '5', imageUrl: '/placeholder.svg' },
  { id: '6', imageUrl: '/placeholder.svg' },
];

const InstagramGalleryBlock = ({
  title: propTitle,
  instagramHandle: propHandle,
  posts: propPosts,
  animationsEnabled = true,
  config
}: InstagramGalleryBlockProps) => {
  // Prioritize config values over direct props
  const title = config?.title ?? propTitle ?? 'Suivez-nous sur Instagram';
  const instagramHandle = config?.instagramHandle ?? propHandle ?? '@maboutique';
  const posts = config?.posts ?? propPosts ?? DEFAULT_POSTS;

  const MotionDiv = animationsEnabled ? motion.div : 'div' as any;

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-primary mb-3">
            <Instagram className="w-6 h-6" />
            <span className="font-medium">{instagramHandle}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {posts.slice(0, 6).map((post, index) => (
            <MotionDiv
              key={post.id}
              initial={animationsEnabled ? { opacity: 0, scale: 0.9 } : undefined}
              whileInView={animationsEnabled ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer"
            >
              <img 
                src={post.imageUrl || '/placeholder.svg'} 
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </MotionDiv>
          ))}
        </div>

        {instagramHandle && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open(`https://instagram.com/${instagramHandle.replace('@', '')}`, '_blank')}
            >
              <Instagram className="w-4 h-4" />
              Voir plus sur Instagram
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default InstagramGalleryBlock;

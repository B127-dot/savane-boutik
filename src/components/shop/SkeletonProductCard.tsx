import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const SkeletonProductCard = () => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Image Skeleton */}
      <AspectRatio ratio={1}>
        <Skeleton className="w-full h-full" />
      </AspectRatio>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Rating */}
        <Skeleton className="h-4 w-24" />
        
        {/* Product Name */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>

        {/* Price */}
        <Skeleton className="h-8 w-32 mx-auto" />

        {/* Button */}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export default SkeletonProductCard;

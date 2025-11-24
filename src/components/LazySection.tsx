import { lazy, Suspense, useEffect, useRef, useState, ComponentType } from 'react';
import SectionSkeleton from './SectionSkeleton';

interface LazySectionProps {
  importFunc: () => Promise<{ default: ComponentType<any> }>;
  skeletonHeight?: string;
  threshold?: number;
}

const LazySection = ({ 
  importFunc, 
  skeletonHeight = "h-96",
  threshold = 0.1 
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '100px' } // Start loading 100px before visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const LazyComponent = lazy(importFunc);

  return (
    <div ref={sectionRef}>
      {isVisible ? (
        <Suspense fallback={<SectionSkeleton height={skeletonHeight} />}>
          <LazyComponent />
        </Suspense>
      ) : (
        <SectionSkeleton height={skeletonHeight} />
      )}
    </div>
  );
};

export default LazySection;

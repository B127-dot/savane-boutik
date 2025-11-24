const SectionSkeleton = ({ height = "h-96" }: { height?: string }) => {
  return (
    <div className={`${height} w-full animate-pulse bg-card/30 backdrop-blur-sm relative overflow-hidden`}>
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />
      
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center gap-4">
        <div className="h-8 w-64 bg-muted/50 rounded-lg" />
        <div className="h-4 w-96 bg-muted/30 rounded-lg" />
        <div className="h-4 w-80 bg-muted/30 rounded-lg" />
      </div>
    </div>
  );
};

export default SectionSkeleton;

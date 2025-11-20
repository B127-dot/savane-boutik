interface StepConnectorProps {
  direction: 'horizontal' | 'vertical';
  animated?: boolean;
}

export const StepConnector = ({ direction, animated = true }: StepConnectorProps) => {
  if (direction === 'horizontal') {
    return (
      <div className="hidden md:flex items-center justify-center">
        <div className="relative w-full h-[2px]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 animate-pulse" />
          )}
          {/* Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-primary/50 rotate-45" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex md:hidden justify-center py-2">
      <div className="relative h-12 w-[2px]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary to-primary/0 animate-pulse" />
        )}
        {/* Arrow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 border-b-2 border-r-2 border-primary/50 rotate-45" />
      </div>
    </div>
  );
};

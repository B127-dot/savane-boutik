import { useState } from 'react';
import { Monitor, Tablet, Smartphone, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

interface DevicePreviewFrameProps {
  iframeUrl: string;
  isLoading: boolean;
  onLoadComplete?: () => void;
}

const DevicePreviewFrame = ({ iframeUrl, isLoading, onLoadComplete }: DevicePreviewFrameProps) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [iframeKey, setIframeKey] = useState(0);

  const getFrameDimensions = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-[375px] h-[667px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      default:
        return 'w-full h-full';
    }
  };

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="flex-1 flex flex-col bg-muted/30 rounded-lg overflow-hidden">
      {/* Device Toggle Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          {[
            { mode: 'desktop' as DeviceMode, icon: Monitor, label: 'Desktop' },
            { mode: 'tablet' as DeviceMode, icon: Tablet, label: 'Tablet' },
            { mode: 'mobile' as DeviceMode, icon: Smartphone, label: 'Mobile' }
          ].map(({ mode, icon: Icon, label }) => (
            <Button
              key={mode}
              variant={deviceMode === mode ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDeviceMode(mode)}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Actualiser
        </Button>
      </div>

      {/* Address Bar Simulation */}
      <div className="px-4 py-2 bg-card/50 border-b border-border/50 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 bg-muted/50 rounded px-3 py-1.5 text-xs text-muted-foreground truncate">
          {iframeUrl}
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex-1 overflow-auto flex items-start justify-center p-4 md:p-6">
        <div className={`relative ${getFrameDimensions()} transition-all duration-300 ${deviceMode !== 'desktop' ? 'shadow-2xl rounded-lg border border-border' : ''}`}>
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-background/95 backdrop-blur-sm flex items-center justify-center">
              <div className="space-y-4 w-full max-w-md p-8">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <Skeleton className="h-32" />
                  <Skeleton className="h-32" />
                  <Skeleton className="h-32" />
                </div>
              </div>
            </div>
          )}
          
          <iframe
            key={iframeKey}
            src={iframeUrl}
            className="w-full h-full border-0 rounded-lg"
            title="Aperçu du thème"
            sandbox="allow-scripts allow-same-origin"
            onLoad={onLoadComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default DevicePreviewFrame;

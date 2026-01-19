import { useState, useEffect } from 'react';
import { Youtube, Play, AlertCircle, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface YouTubeEditorProps {
  title: string;
  subtitle: string;
  videoUrl: string;
  thumbnailUrl?: string;
  onChange: (config: { title: string; subtitle: string; videoUrl: string; thumbnailUrl?: string }) => void;
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

const YouTubeEditor = ({ title, subtitle, videoUrl, thumbnailUrl, onChange }: YouTubeEditorProps) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isValidUrl, setIsValidUrl] = useState(false);

  useEffect(() => {
    const id = extractVideoId(videoUrl);
    setVideoId(id);
    setIsValidUrl(!!id);
  }, [videoUrl]);

  const handleChange = (updates: Partial<{ title: string; subtitle: string; videoUrl: string; thumbnailUrl?: string }>) => {
    onChange({
      title: updates.title !== undefined ? updates.title : title,
      subtitle: updates.subtitle !== undefined ? updates.subtitle : subtitle,
      videoUrl: updates.videoUrl !== undefined ? updates.videoUrl : videoUrl,
      thumbnailUrl: updates.thumbnailUrl !== undefined ? updates.thumbnailUrl : thumbnailUrl,
    });
  };

  return (
    <div className="space-y-6">
      {/* Section header settings */}
      <div className="space-y-4 p-4 rounded-xl bg-muted/50 border border-border/50">
        <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
          <Youtube className="w-4 h-4 text-red-500" />
          Paramètres Vidéo
        </h4>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs">Titre de la section</Label>
            <Input
              value={title}
              onChange={(e) => handleChange({ title: e.target.value })}
              placeholder="Découvrez notre histoire"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Sous-titre</Label>
            <Input
              value={subtitle}
              onChange={(e) => handleChange({ subtitle: e.target.value })}
              placeholder="Une vidéo vaut mille mots"
            />
          </div>
        </div>
      </div>

      {/* Video URL */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs">URL de la vidéo YouTube</Label>
          <div className="relative">
            <Input
              value={videoUrl}
              onChange={(e) => handleChange({ videoUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
              className={isValidUrl ? 'pr-10 border-green-500/50' : videoUrl ? 'pr-10 border-red-500/50' : ''}
            />
            {videoUrl && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isValidUrl ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
            )}
          </div>
          {videoUrl && !isValidUrl && (
            <p className="text-xs text-red-500">URL YouTube invalide</p>
          )}
        </div>

        {/* Video Preview */}
        {videoId && (
          <div className="space-y-2">
            <Label className="text-xs">Aperçu</Label>
            <div className="aspect-video rounded-xl overflow-hidden bg-muted border border-border/50 relative">
              <img
                src={thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white ml-1" fill="white" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Thumbnail */}
        <div className="space-y-2">
          <Label className="text-xs">Miniature personnalisée (optionnel)</Label>
          <Input
            value={thumbnailUrl || ''}
            onChange={(e) => handleChange({ thumbnailUrl: e.target.value || undefined })}
            placeholder="https://... (laissez vide pour utiliser la miniature YouTube)"
          />
        </div>
      </div>
    </div>
  );
};

export default YouTubeEditor;

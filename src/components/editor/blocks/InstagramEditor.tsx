import { useState } from 'react';
import { Plus, Trash2, Instagram, Image, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

export interface InstagramPost {
  id: string;
  imageUrl: string;
  link?: string;
}

interface InstagramEditorProps {
  title: string;
  instagramHandle: string;
  posts: InstagramPost[];
  onChange: (config: { title: string; instagramHandle: string; posts: InstagramPost[] }) => void;
}

const InstagramEditor = ({ title, instagramHandle, posts, onChange }: InstagramEditorProps) => {
  const handleTitleChange = (newTitle: string) => {
    onChange({ title: newTitle, instagramHandle, posts });
  };

  const handleHandleChange = (newHandle: string) => {
    onChange({ title, instagramHandle: newHandle, posts });
  };

  const addPost = () => {
    const newPost: InstagramPost = {
      id: `post_${Date.now()}`,
      imageUrl: '',
      link: '',
    };
    onChange({ title, instagramHandle, posts: [...posts, newPost] });
  };

  const updatePost = (id: string, updates: Partial<InstagramPost>) => {
    const updated = posts.map(p => p.id === id ? { ...p, ...updates } : p);
    onChange({ title, instagramHandle, posts: updated });
  };

  const removePost = (id: string) => {
    onChange({ title, instagramHandle, posts: posts.filter(p => p.id !== id) });
  };

  return (
    <div className="space-y-6">
      {/* Section header settings */}
      <div className="space-y-4 p-4 rounded-xl bg-muted/50 border border-border/50">
        <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
          <Instagram className="w-4 h-4 text-pink-500" />
          Paramètres Instagram
        </h4>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs">Titre de la section</Label>
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Suivez-nous sur Instagram"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Handle Instagram</Label>
            <Input
              value={instagramHandle}
              onChange={(e) => handleHandleChange(e.target.value)}
              placeholder="@votreboutique"
            />
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-foreground">Photos ({posts.length}/6)</h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addPost}
            className="gap-2"
            disabled={posts.length >= 6}
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {posts.slice(0, 6).map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border/50">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt="Instagram post"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removePost(post.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {posts.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground">Modifiez les URLs des images :</p>
            {posts.map((post, index) => (
              <div key={post.id} className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <Input
                    value={post.imageUrl}
                    onChange={(e) => updatePost(post.id, { imageUrl: e.target.value })}
                    placeholder="URL de l'image"
                    className="flex-1"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            <Instagram className="w-8 h-8 mx-auto mb-2 opacity-50" />
            Ajoutez jusqu'à 6 photos Instagram
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramEditor;

import { useState } from 'react';
import { Settings, User, Camera, Lock, Eye, EyeOff, Trash2, Check, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'infos' | 'photo' | 'password';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'infos', label: 'Infos', icon: User },
  { id: 'photo', label: 'Photo', icon: Camera },
  { id: 'password', label: 'Mot de passe', icon: Lock },
];

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: { name?: string; email?: string } | null;
  onSave?: (data: { firstName: string; lastName: string; phone: string }) => void;
}

const EditProfileModal = ({ open, onOpenChange, user, onSave }: EditProfileModalProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('infos');
  const nameParts = (user?.name || '').split(' ');
  const [firstName, setFirstName] = useState(nameParts[0] || '');
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') || '');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getUserInitials = () => {
    const f = firstName?.[0] || '';
    const l = lastName?.[0] || '';
    return (f + l).toUpperCase() || 'U';
  };

  const handleSaveInfos = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    onSave?.({ firstName, lastName, phone });
    toast.success('Profil mis à jour avec succès');
    setIsSaving(false);
    onOpenChange(false);
  };

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/gif,image/webp';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error('La taille maximale est de 5 MB');
          return;
        }
        const url = URL.createObjectURL(file);
        setAvatarUrl(url);
        toast.success('Photo de profil mise à jour');
      }
    };
    input.click();
  };

  const handleRemovePhoto = () => {
    setAvatarUrl(null);
    toast.success('Photo de profil supprimée');
  };

  const handleCreatePassword = async () => {
    if (password.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success('Mot de passe créé avec succès');
    setPassword('');
    setConfirmPassword('');
    setIsSaving(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] p-0 gap-0 overflow-hidden bg-card border-border/50 backdrop-blur-xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2.5 text-lg font-bold">
            <Settings className="w-5 h-5 text-muted-foreground" />
            Modifier le profil
          </DialogTitle>
          <DialogDescription className="text-primary text-sm">
            Mettez à jour vos informations personnelles
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <div className="px-6 pb-4">
          <div className="flex bg-muted/50 rounded-xl p-1 gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary/15 text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <AnimatePresence mode="wait">
            {/* ── INFOS TAB ── */}
            {activeTab === 'infos' && (
              <motion.div
                key="infos"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Prénom</Label>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Votre prénom"
                      className="h-11 bg-muted/30 border-border/50 focus:bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Nom</Label>
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Votre nom"
                      className="h-11 bg-muted/30 border-border/50 focus:bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-primary">Email</Label>
                  <Input
                    value={user?.email || ''}
                    disabled
                    className="h-11 bg-muted/40 border-border/30 text-muted-foreground"
                  />
                  <p className="text-xs text-muted-foreground">L'email ne peut pas être modifié</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Téléphone</Label>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2 px-3 h-11 bg-muted/30 border border-border/50 rounded-md text-sm text-muted-foreground shrink-0">
                      <span>BF</span>
                      <span>+226</span>
                    </div>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="70 00 00 00"
                      className="h-11 bg-muted/30 border-border/50 focus:bg-background"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-3 border-t border-border/30">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSaveInfos} disabled={isSaving} className="gap-2 bg-primary hover:bg-primary/90">
                    <Check className="w-4 h-4" />
                    {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ── PHOTO TAB ── */}
            {activeTab === 'photo' && (
              <motion.div
                key="photo"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center space-y-6 py-4"
              >
                <Avatar className="w-32 h-32 border-4 border-border/50 shadow-lg">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt="Photo de profil" className="object-cover" />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold text-4xl">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handlePhotoUpload} className="gap-2">
                    <Camera className="w-4 h-4" />
                    Choisir une photo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRemovePhoto}
                    disabled={!avatarUrl}
                    className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </Button>
                </div>

                <div className="text-center text-xs text-muted-foreground space-y-0.5">
                  <p>Formats acceptés : JPG, PNG, GIF, WebP</p>
                  <p>Taille maximale : 5 MB</p>
                </div>
              </motion.div>
            )}

            {/* ── PASSWORD TAB ── */}
            {activeTab === 'password' && (
              <motion.div
                key="password"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Info banner */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="p-1.5 rounded-full bg-primary/10 shrink-0 mt-0.5">
                    <Lock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Compte connecté via Google/Facebook</p>
                    <p className="text-xs text-primary mt-0.5">
                      Vous pouvez créer un mot de passe pour vous connecter également avec email/mot de passe.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Créer un mot de passe</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 bg-muted/30 border-border/50 focus:bg-background pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-primary">Minimum 8 caractères</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 bg-muted/30 border-border/50 focus:bg-background pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-3 border-t border-border/30">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Annuler
                  </Button>
                  <Button
                    onClick={handleCreatePassword}
                    disabled={isSaving || !password || !confirmPassword}
                    className="gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Lock className="w-4 h-4" />
                    {isSaving ? 'Création...' : 'Créer le mot de passe'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;

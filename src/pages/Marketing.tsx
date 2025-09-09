import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Percent, DollarSign, Tag, Share, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { PromoCode } from '@/contexts/AppContext';

const Marketing = () => {
  const { promoCodes, addPromoCode, updatePromoCode, deletePromoCode, shopSettings } = useApp();
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoCode | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: 0,
    expiresAt: '',
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPromo) {
      updatePromoCode(editingPromo.id, formData);
      toast({
        title: "Code promo modifié",
        description: "Le code promo a été mis à jour avec succès",
      });
      setEditingPromo(null);
    } else {
      addPromoCode(formData);
      toast({
        title: "Code promo créé",
        description: "Le nouveau code promo a été créé avec succès",
      });
      setIsAddOpen(false);
    }
    
    setFormData({
      code: '',
      type: 'percentage',
      value: 0,
      expiresAt: '',
      isActive: true
    });
  };

  const handleEdit = (promo: PromoCode) => {
    setEditingPromo(promo);
    setFormData({
      code: promo.code,
      type: promo.type,
      value: promo.value,
      expiresAt: promo.expiresAt.split('T')[0], // Format date for input
      isActive: promo.isActive
    });
  };

  const handleDelete = (id: string) => {
    deletePromoCode(id);
    toast({
      title: "Code promo supprimé",
      description: "Le code promo a été supprimé avec succès",
    });
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code: result });
  };

  const shareLinks = {
    whatsapp: `https://wa.me/?text=Découvrez ma boutique ${shopSettings?.shopName} sur burkinashop.com/${shopSettings?.shopUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=https://burkinashop.com/${shopSettings?.shopUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=Découvrez ${shopSettings?.shopName}&url=https://burkinashop.com/${shopSettings?.shopUrl}`,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Marketing</h1>
          <p className="text-muted-foreground">Gérez vos codes promo et partagez votre boutique</p>
        </div>
      </div>

      <Tabs defaultValue="promos" className="space-y-6">
        <TabsList>
          <TabsTrigger value="promos">
            <Tag className="w-4 h-4 mr-2" />
            Codes promo
          </TabsTrigger>
          <TabsTrigger value="share">
            <Share className="w-4 h-4 mr-2" />
            Partage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="promos" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Codes promotionnels</h2>
              <p className="text-muted-foreground">Créez des offres spéciales pour vos clients</p>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Créer un code promo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nouveau code promo</DialogTitle>
                  <DialogDescription>
                    Créez une promotion pour attirer plus de clients
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="code">Code promotionnel</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="code"
                          value={formData.code}
                          onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                          placeholder="PROMO2024"
                          required
                          className="flex-1"
                        />
                        <Button type="button" variant="outline" onClick={generateRandomCode}>
                          Générer
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type">Type de réduction</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value: 'percentage' | 'fixed') => setFormData({ ...formData, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">Pourcentage (%)</SelectItem>
                            <SelectItem value="fixed">Montant fixe (XOF)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="value">Valeur</Label>
                        <div className="relative">
                          <Input
                            id="value"
                            type="number"
                            value={formData.value}
                            onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                            placeholder="10"
                            required
                            min="1"
                          />
                          <div className="absolute inset-y-0 right-3 flex items-center">
                            {formData.type === 'percentage' ? (
                              <Percent className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <span className="text-sm text-muted-foreground">XOF</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="expiresAt">Date d'expiration</Label>
                      <Input
                        id="expiresAt"
                        type="date"
                        value={formData.expiresAt}
                        onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={formData.isActive}
                        onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                      />
                      <Label>Activer immédiatement</Label>
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                      Annuler
                    </Button>
                    <Button type="submit">Créer</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promoCodes.map((promo) => (
              <Card key={promo.id} className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="font-mono text-sm">
                          {promo.code}
                        </Badge>
                        <Badge variant={promo.isActive ? "default" : "outline"}>
                          {promo.isActive ? "Actif" : "Inactif"}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {promo.type === 'percentage' ? (
                          <Percent className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="text-lg font-bold">
                          {promo.value}{promo.type === 'percentage' ? '%' : ' XOF'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEdit(promo)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(promo.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Expire le {new Date(promo.expiresAt).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Réduction de {promo.type === 'percentage' ? `${promo.value}%` : `${promo.value} XOF`}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="share" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Partagez votre boutique
              </CardTitle>
              <CardDescription>
                Faites connaître votre boutique sur les réseaux sociaux
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-accent/10 rounded-lg">
                <Label>Lien de votre boutique</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    value={`https://burkinashop.com/${shopSettings?.shopUrl}`}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://burkinashop.com/${shopSettings?.shopUrl}`);
                      toast({
                        title: "Lien copié",
                        description: "Le lien a été copié dans le presse-papiers",
                      });
                    }}
                  >
                    Copier
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-2">WhatsApp</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Partagez avec vos contacts
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(shareLinks.whatsapp, '_blank')}
                      className="w-full"
                    >
                      Partager
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-2">Facebook</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Partagez sur votre profil
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(shareLinks.facebook, '_blank')}
                      className="w-full"
                    >
                      Partager
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-sky-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-2">Twitter</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Tweetez votre boutique
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(shareLinks.twitter, '_blank')}
                      className="w-full"
                    >
                      Partager
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={!!editingPromo} onOpenChange={() => setEditingPromo(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le code promo</DialogTitle>
            <DialogDescription>
              Modifiez les paramètres de votre promotion
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-code">Code promotionnel</Label>
                <Input
                  id="edit-code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-type">Type de réduction</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: 'percentage' | 'fixed') => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Pourcentage (%)</SelectItem>
                      <SelectItem value="fixed">Montant fixe (XOF)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="edit-value">Valeur</Label>
                  <Input
                    id="edit-value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                    required
                    min="1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="edit-expiresAt">Date d'expiration</Label>
                <Input
                  id="edit-expiresAt"
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label>Code actif</Label>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setEditingPromo(null)}>
                Annuler
              </Button>
              <Button type="submit">Sauvegarder</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketing;
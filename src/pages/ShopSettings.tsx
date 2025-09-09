import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Globe, Phone, MapPin, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ShopSettings = () => {
  const { shopSettings, updateShopSettings, user } = useApp();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    shopName: '',
    description: '',
    phone: '',
    address: '',
    primaryColor: '#22c55e',
    shopUrl: '',
    whatsapp: '',
    facebook: '',
    instagram: ''
  });

  useEffect(() => {
    if (shopSettings) {
      setFormData({
        shopName: shopSettings.shopName,
        description: shopSettings.description,
        phone: shopSettings.phone,
        address: shopSettings.address,
        primaryColor: shopSettings.primaryColor,
        shopUrl: shopSettings.shopUrl,
        whatsapp: shopSettings.socialLinks.whatsapp || '',
        facebook: shopSettings.socialLinks.facebook || '',
        instagram: shopSettings.socialLinks.instagram || ''
      });
    }
  }, [shopSettings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateShopSettings({
      shopName: formData.shopName,
      description: formData.description,
      phone: formData.phone,
      address: formData.address,
      primaryColor: formData.primaryColor,
      shopUrl: formData.shopUrl,
      socialLinks: {
        whatsapp: formData.whatsapp,
        facebook: formData.facebook,
        instagram: formData.instagram
      }
    });

    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres de votre boutique ont été mis à jour",
    });
  };

  const handleColorChange = (color: string) => {
    setFormData({ ...formData, primaryColor: color });
    // Apply color preview
    document.documentElement.style.setProperty('--primary', `${color}`);
  };

  const predefinedColors = [
    '#22c55e', // Green
    '#3b82f6', // Blue
    '#f59e0b', // Orange
    '#ef4444', // Red
    '#8b5cf6', // Purple
    '#06b6d4', // Cyan
    '#f97316', // Orange
    '#84cc16', // Lime
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Ma boutique</h1>
        <p className="text-muted-foreground">Personnalisez l'apparence et les informations de votre boutique</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">
            <Globe className="w-4 h-4 mr-2" />
            Général
          </TabsTrigger>
          <TabsTrigger value="design">
            <Palette className="w-4 h-4 mr-2" />
            Design
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Phone className="w-4 h-4 mr-2" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>Configurez les informations de base de votre boutique</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shopName">Nom de la boutique</Label>
                    <Input
                      id="shopName"
                      value={formData.shopName}
                      onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shopUrl">URL de la boutique</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        burkinashop.com/
                      </span>
                      <Input
                        id="shopUrl"
                        value={formData.shopUrl}
                        onChange={(e) => setFormData({ ...formData, shopUrl: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                        className="rounded-l-none"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description de la boutique</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez votre boutique..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personnalisation du design</CardTitle>
                <CardDescription>Choisissez les couleurs de votre boutique</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Couleur principale</Label>
                  <div className="grid grid-cols-8 gap-2 mt-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleColorChange(color)}
                        className={`w-10 h-10 rounded-lg border-2 transition-all ${
                          formData.primaryColor === color
                            ? 'border-foreground scale-110'
                            : 'border-border hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="customColor">Couleur personnalisée</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      type="color"
                      id="customColor"
                      value={formData.primaryColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={formData.primaryColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      placeholder="#22c55e"
                      className="flex-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
                <CardDescription>Configurez vos coordonnées</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+226 70 12 34 56"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+226 70 12 34 56"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Secteur 15, Ouagadougou, Burkina Faso"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                      placeholder="https://facebook.com/maboutique"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      placeholder="https://instagram.com/maboutique"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aperçu de votre boutique</CardTitle>
                <CardDescription>Voici comment votre boutique apparaîtra aux clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 bg-gradient-hero">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-primary mx-auto flex items-center justify-center">
                      <Globe className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold" style={{ color: formData.primaryColor }}>
                        {formData.shopName || 'Nom de votre boutique'}
                      </h2>
                      <p className="text-muted-foreground">
                        burkinashop.com/{formData.shopUrl || 'votre-boutique'}
                      </p>
                    </div>
                    <p className="text-center max-w-md mx-auto">
                      {formData.description || 'Description de votre boutique'}
                    </p>
                    <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {formData.phone || '+226 70 12 34 56'}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {formData.address || 'Ouagadougou, Burkina Faso'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Sauvegarder les modifications
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
};

export default ShopSettings;
import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Palette, Globe, Phone, MapPin, Eye, Copy, ExternalLink, CheckCircle2, MessageCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { isValidWhatsAppNumber } from '@/lib/whatsapp';
import ThemeSelector from '@/components/ThemeSelector';


const ShopSettings = () => {
  const { shopSettings, updateShopSettings, user } = useApp();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
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

  const fullShopUrl = `${window.location.origin}/shop/${formData.shopUrl || 'ma-boutique'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullShopUrl);
    setCopied(true);
    toast({
      title: "Lien copié !",
      description: "Le lien de votre boutique a été copié dans le presse-papier",
    });
    setTimeout(() => setCopied(false), 2000);
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
        <h1 className="text-3xl font-display font-bold text-foreground">Ma boutique</h1>
        <p className="font-body text-muted-foreground">Personnalisez l'apparence et les informations de votre boutique</p>
      </div>

      {/* Lien de la boutique */}
      <Card className="bg-gradient-hero border-primary/20">
        <CardHeader>
          <CardTitle>Lien de votre boutique</CardTitle>
          <CardDescription>
            Partagez ce lien avec vos clients ou intégrez-le sur vos réseaux sociaux
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-background rounded-lg border">
            <code className="flex-1 text-sm text-muted-foreground truncate">
              {fullShopUrl}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyLink}
              className="shrink-0"
            >
              {copied ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="flex-1">
              <a href={`/shop/${formData.shopUrl}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Ouvrir dans un nouvel onglet
              </a>
            </Button>
            <Button onClick={handleCopyLink}>
              <Copy className="mr-2 h-4 w-4" />
              Copier le lien
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">
            <Globe className="w-4 h-4 mr-2" />
            Général
          </TabsTrigger>
          <TabsTrigger value="design">
            <Palette className="w-4 h-4 mr-2" />
            Design
          </TabsTrigger>
          <TabsTrigger value="theme">
            <Palette className="w-4 h-4 mr-2" />
            Thème
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

          <TabsContent value="theme" className="space-y-6">
            <ThemeSelector
              currentTheme={shopSettings?.selectedTheme || 'modern'}
              onThemeChange={(themeId) => {
                updateShopSettings({ selectedTheme: themeId });
              }}
            />
          </TabsContent>




          <TabsContent value="contact" className="space-y-6">
            <Alert className="border-[#25D366] bg-[#25D366]/10">
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <AlertTitle>Activez les commandes WhatsApp !</AlertTitle>
              <AlertDescription className="text-sm space-y-2 mt-2">
                <p>Permettez à vos clients de commander directement via WhatsApp.</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Format attendu : +226 70 12 34 56</li>
                  <li>Obtenez un numéro WhatsApp Business gratuit</li>
                  <li>Les boutons WhatsApp apparaîtront automatiquement sur votre boutique</li>
                </ul>
              </AlertDescription>
            </Alert>

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
                    <Label htmlFor="whatsapp" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-[#25D366]" />
                      WhatsApp Business
                    </Label>
                    <Input
                      id="whatsapp"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+226 70 12 34 56"
                      className={formData.whatsapp && !isValidWhatsAppNumber(formData.whatsapp) ? 'border-destructive' : ''}
                    />
                    {formData.whatsapp && !isValidWhatsAppNumber(formData.whatsapp) && (
                      <p className="text-xs text-destructive mt-1">
                        Format invalide. Utilisez le format international : +226 70 12 34 56
                      </p>
                    )}
                    {formData.whatsapp && isValidWhatsAppNumber(formData.whatsapp) && (
                      <p className="text-xs text-[#25D366] mt-1 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Numéro valide ! Les clients pourront commander via WhatsApp
                      </p>
                    )}
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
                      <h2 className="text-2xl font-display font-bold" style={{ color: formData.primaryColor }}>
                        {formData.shopName || 'Nom de votre boutique'}
                      </h2>
                      <p className="font-body text-muted-foreground">
                        burkinashop.com/{formData.shopUrl || 'votre-boutique'}
                      </p>
                    </div>
                    <p className="text-center font-body max-w-md mx-auto">
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
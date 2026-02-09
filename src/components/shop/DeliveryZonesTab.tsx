import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useApp, DeliveryZone } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Truck, Plus, Trash2, Pencil, Check, X, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DeliveryZonesTab = () => {
  const { shopSettings, updateShopSettings } = useApp();
  const { toast } = useToast();
  
  const zones = shopSettings?.deliveryZones || [];
  const freeThreshold = shopSettings?.freeDeliveryThreshold;
  
  const [newZoneName, setNewZoneName] = useState('');
  const [newZonePrice, setNewZonePrice] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [showThreshold, setShowThreshold] = useState(!!freeThreshold);
  const [thresholdValue, setThresholdValue] = useState(freeThreshold?.toString() || '');

  const handleAddZone = () => {
    if (!newZoneName.trim() || !newZonePrice.trim()) {
      toast({ title: "Erreur", description: "Remplissez le nom et le prix", variant: "destructive" });
      return;
    }
    const price = parseInt(newZonePrice);
    if (isNaN(price) || price < 0) {
      toast({ title: "Erreur", description: "Le prix doit être un nombre positif", variant: "destructive" });
      return;
    }
    const newZone: DeliveryZone = {
      id: Date.now().toString(),
      name: newZoneName.trim(),
      price,
      isActive: true
    };
    updateShopSettings({ deliveryZones: [...zones, newZone] });
    setNewZoneName('');
    setNewZonePrice('');
    toast({ title: "Zone ajoutée", description: `${newZone.name} - ${newZone.price.toLocaleString()} FCFA` });
  };

  const handleDeleteZone = (id: string) => {
    updateShopSettings({ deliveryZones: zones.filter(z => z.id !== id) });
    toast({ title: "Zone supprimée" });
  };

  const startEdit = (zone: DeliveryZone) => {
    setEditingId(zone.id);
    setEditName(zone.name);
    setEditPrice(zone.price.toString());
  };

  const saveEdit = () => {
    if (!editName.trim() || !editPrice.trim()) return;
    const price = parseInt(editPrice);
    if (isNaN(price) || price < 0) return;
    updateShopSettings({
      deliveryZones: zones.map(z => z.id === editingId ? { ...z, name: editName.trim(), price } : z)
    });
    setEditingId(null);
    toast({ title: "Zone modifiée" });
  };

  const toggleZoneActive = (id: string) => {
    updateShopSettings({
      deliveryZones: zones.map(z => z.id === id ? { ...z, isActive: !z.isActive } : z)
    });
  };

  const handleThresholdChange = (enabled: boolean) => {
    setShowThreshold(enabled);
    if (!enabled) {
      updateShopSettings({ freeDeliveryThreshold: undefined });
      setThresholdValue('');
    }
  };

  const saveThreshold = () => {
    const val = parseInt(thresholdValue);
    if (isNaN(val) || val <= 0) {
      toast({ title: "Erreur", description: "Le seuil doit être un nombre positif", variant: "destructive" });
      return;
    }
    updateShopSettings({ freeDeliveryThreshold: val });
    toast({ title: "Seuil sauvegardé", description: `Livraison gratuite à partir de ${val.toLocaleString()} FCFA` });
  };

  return (
    <div className="space-y-6">
      <Alert className="border-primary/20 bg-primary/5">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-sm">
          Configurez vos zones de livraison avec leurs tarifs. Vos clients pourront choisir leur quartier lors de la commande et les frais seront calculés automatiquement.
        </AlertDescription>
      </Alert>

      {/* Add new zone */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Ajouter une zone
          </CardTitle>
          <CardDescription>Ajoutez un quartier ou une zone avec son tarif de livraison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Label htmlFor="zoneName">Quartier / Zone</Label>
              <Input
                id="zoneName"
                value={newZoneName}
                onChange={(e) => setNewZoneName(e.target.value)}
                placeholder="Ex: Pissy, Gounghin, Ouaga 2000..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddZone()}
              />
            </div>
            <div className="w-40">
              <Label htmlFor="zonePrice">Prix (FCFA)</Label>
              <Input
                id="zonePrice"
                type="number"
                value={newZonePrice}
                onChange={(e) => setNewZonePrice(e.target.value)}
                placeholder="500"
                min="0"
                onKeyDown={(e) => e.key === 'Enter' && handleAddZone()}
              />
            </div>
            <Button onClick={handleAddZone} className="shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Zones list */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Zones de livraison ({zones.length})
          </CardTitle>
          <CardDescription>Gérez vos zones et tarifs de livraison</CardDescription>
        </CardHeader>
        <CardContent>
          {zones.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Truck className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Aucune zone configurée</p>
              <p className="text-sm">Ajoutez votre première zone de livraison ci-dessus</p>
            </div>
          ) : (
            <div className="space-y-2">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    zone.isActive ? 'bg-card' : 'bg-muted/50 opacity-60'
                  }`}
                >
                  <Switch
                    checked={zone.isActive}
                    onCheckedChange={() => toggleZoneActive(zone.id)}
                  />
                  
                  {editingId === zone.id ? (
                    <>
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 h-8"
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                      />
                      <Input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="w-28 h-8"
                        min="0"
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                      />
                      <span className="text-sm text-muted-foreground">FCFA</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={saveEdit}>
                        <Check className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingId(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 font-medium">{zone.name}</span>
                      <span className="font-bold text-primary">{zone.price.toLocaleString()} FCFA</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(zone)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteZone(zone.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Free delivery threshold */}
      <Card>
        <CardHeader>
          <CardTitle>Livraison gratuite</CardTitle>
          <CardDescription>Offrez la livraison gratuite à partir d'un certain montant</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch checked={showThreshold} onCheckedChange={handleThresholdChange} />
            <Label>Activer le seuil de livraison gratuite</Label>
          </div>
          {showThreshold && (
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Label htmlFor="threshold">Montant minimum (FCFA)</Label>
                <Input
                  id="threshold"
                  type="number"
                  value={thresholdValue}
                  onChange={(e) => setThresholdValue(e.target.value)}
                  placeholder="Ex: 15000"
                  min="0"
                />
              </div>
              <Button onClick={saveThreshold} className="shrink-0">
                Sauvegarder
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryZonesTab;

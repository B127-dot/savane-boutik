import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Package, Eye, User, Mail, Phone, MapPin, FileText, Copy } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import type { Order } from '@/contexts/AppContext';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const Orders = () => {
  const { orders, products, updateOrderStatus } = useApp();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerPhone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    toast({
      title: "Statut mis à jour",
      description: `La commande #${orderId} est maintenant ${newStatus}`,
    });
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'default';
      case 'confirmed': return 'secondary';
      case 'shipped': return 'outline';
      case 'delivered': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copié !",
      description: `${label} copié dans le presse-papiers`,
    });
  };

  const OrderDetails = ({ order }: { order: Order }) => {
    return (
      <div className="space-y-6">
        {/* Section 1: Informations de la commande */}
        <div className="space-y-3">
          <h4 className="font-semibold text-lg">Informations de la commande</h4>
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">ID de commande</p>
              <p className="font-medium">#{order.id}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Statut</p>
              <Badge variant={getStatusColor(order.status)}>
                {getStatusLabel(order.status)}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-lg font-bold text-primary">
                {order.total.toLocaleString('fr-FR')} FCFA
              </p>
            </div>
            {order.promoCode && (
              <div className="space-y-2 col-span-2">
                <p className="text-sm text-muted-foreground">Code promo utilisé</p>
                <p className="font-medium">{order.promoCode}</p>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Informations du client */}
        <div className="space-y-3">
          <h4 className="font-semibold text-lg">Informations du client</h4>
          <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
            {/* Nom */}
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Nom complet</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
            </div>

            {/* Email */}
            {order.customerEmail && (
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{order.customerEmail}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(order.customerEmail, "Email")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Téléphone */}
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p className="font-medium">{order.customerPhone}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(order.customerPhone, "Téléphone")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <a href={`tel:${order.customerPhone}`}>
                    <Phone className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Adresse */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Adresse de livraison</p>
                <p className="font-medium">{order.deliveryAddress}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(order.deliveryAddress, "Adresse")}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Notes supplémentaires</p>
                  <p className="font-medium">{order.notes}</p>
                </div>
              </div>
            )}

            {/* Bouton WhatsApp */}
            <div className="pt-3 border-t">
              <WhatsAppButton
                phoneNumber={order.customerPhone}
                message={`Bonjour ${order.customerName}, concernant votre commande #${order.id}...`}
                variant="default"
                label="Contacter sur WhatsApp"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Produits commandés */}
        <div className="space-y-3">
          <h4 className="font-semibold text-lg">Produits commandés</h4>
          <div className="space-y-2">
            {order.products.map((item, index) => {
              const product = products.find(p => p.id === item.productId);
              return (
                <div key={index} className="flex gap-3 p-3 border rounded-lg">
                  {/* Product Image */}
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    {product?.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <p className="font-medium">{product?.name || 'Produit introuvable'}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantité: {item.quantity}
                    </p>
                  </div>

                  {/* Price Info */}
                  <div className="text-right">
                    <p className="font-medium">
                      {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.price.toLocaleString('fr-FR')} FCFA × {item.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Changer le statut */}
        <div className="pt-4 border-t">
          <h4 className="font-semibold mb-2">Changer le statut</h4>
          <Select
            value={order.status}
            onValueChange={(value: Order['status']) => handleStatusChange(order.id, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="confirmed">Confirmée</SelectItem>
              <SelectItem value="shipped">Expédiée</SelectItem>
              <SelectItem value="delivered">Livrée</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">Gestion des Commandes</h1>
          <p className="font-body text-muted-foreground">
            Suivez et gérez toutes les commandes
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par ID, nom, email ou téléphone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="confirmed">Confirmée</SelectItem>
            <SelectItem value="shipped">Expédiée</SelectItem>
            <SelectItem value="delivered">Livrée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Liste des Commandes
          </CardTitle>
          <CardDescription>
            {filteredOrders.length} commande(s) trouvée(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      {order.customerEmail && (
                        <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{order.customerPhone}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.total.toLocaleString('fr-FR')} FCFA
                  </TableCell>
                  <TableCell>
                    <Dialog open={selectedOrder?.id === order.id} onOpenChange={(open) => !open && setSelectedOrder(null)}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Détails de la commande #{order.id}</DialogTitle>
                          <DialogDescription>
                            Informations complètes de la commande
                          </DialogDescription>
                        </DialogHeader>
                        <OrderDetails order={order} />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
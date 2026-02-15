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
      <div className="space-y-4">
        {/* En-tête en 2 colonnes */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg">
          {/* Colonne gauche: ID, Client, Date */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Commande</p>
              <p className="font-semibold">#{order.id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Client</p>
              <p className="font-medium text-sm">{order.customerName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="text-sm">
                {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          {/* Colonne droite: Statut + Total */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Statut</p>
              <Select
                value={order.status}
                onValueChange={(value: Order['status']) => handleStatusChange(order.id, value)}
              >
                <SelectTrigger className="h-8">
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
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-xl font-bold text-primary">
                {order.total.toLocaleString('fr-FR')} FCFA
              </p>
            </div>
            {order.promoCode && (
              <div>
                <p className="text-xs text-muted-foreground">Code promo</p>
                <p className="text-sm font-medium">{order.promoCode}</p>
              </div>
            )}
          </div>
        </div>

        {/* Informations du client en grid compact */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-muted/30 rounded-lg">
          {/* Nom */}
          <div className="flex items-start gap-2 col-span-2">
            <User className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Nom</p>
              <p className="font-medium text-sm truncate">{order.customerName}</p>
            </div>
          </div>

          {/* Email */}
          {order.customerEmail && (
            <div className="flex items-start gap-2 col-span-2">
              <Mail className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm truncate">{order.customerEmail}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => copyToClipboard(order.customerEmail, "Email")}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          )}

          {/* Téléphone */}
          <div className="flex items-start gap-2 col-span-2">
            <Phone className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Téléphone</p>
              <p className="text-sm">{order.customerPhone}</p>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => copyToClipboard(order.customerPhone, "Téléphone")}
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                asChild
              >
                <a href={`tel:${order.customerPhone}`}>
                  <Phone className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </div>

          {/* Adresse */}
          <div className="flex items-start gap-2 col-span-2">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Adresse</p>
              <p className="text-sm">{order.deliveryAddress}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => copyToClipboard(order.deliveryAddress, "Adresse")}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="flex items-start gap-2 col-span-2">
              <FileText className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Notes</p>
                <p className="text-sm">{order.notes}</p>
              </div>
            </div>
          )}

          {/* Bouton WhatsApp compact */}
          <div className="col-span-2 pt-2 border-t">
            <WhatsAppButton
              phoneNumber={order.customerPhone}
              message={`Bonjour ${order.customerName}, concernant votre commande #${order.id}...`}
              variant="default"
              label="WhatsApp"
              className="w-full h-8 text-sm"
            />
          </div>
        </div>

        {/* Produits commandés compacts */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Produits</h4>
          <div className="space-y-2">
            {order.products.map((item, index) => {
              const product = products.find(p => p.id === item.productId);
              return (
                <div key={index} className="flex items-center gap-2 p-2 border rounded-lg">
                  {/* Image plus petite */}
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    {product?.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Info produit sur une ligne */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product?.name || 'Produit introuvable'}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.price.toLocaleString('fr-FR')} FCFA × {item.quantity}
                    </p>
                  </div>

                  {/* Prix total */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-sm">
                      {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 pt-16 lg:pt-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold">Commandes</h1>
          <p className="font-body text-muted-foreground">
            Suivez et gérez toutes les commandes
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center space-x-2 flex-1">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par ID, nom, email ou téléphone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
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
          {/* Mobile: Card view */}
          <div className="sm:hidden space-y-3">
            {filteredOrders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Aucune commande trouvée</p>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">#{order.id}</span>
                    <Badge variant={getStatusColor(order.status)} className="text-xs">
                      {getStatusLabel(order.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerPhone}</p>
                    </div>
                    <span className="font-bold text-sm whitespace-nowrap">{order.total.toLocaleString('fr-FR')} F</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                    <Dialog open={selectedOrder?.id === order.id} onOpenChange={(open) => !open && setSelectedOrder(null)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                          <Eye className="w-4 h-4 mr-1" /> Voir
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Commande #{order.id}</DialogTitle>
                          <DialogDescription>Informations complètes</DialogDescription>
                        </DialogHeader>
                        <OrderDetails order={order} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop: Table view */}
          <div className="overflow-x-auto hidden sm:block">
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
                      <DialogContent className="max-w-2xl">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
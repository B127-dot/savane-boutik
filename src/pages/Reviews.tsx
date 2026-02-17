import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Star, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Review } from '@/contexts/AppContext';

const Reviews = () => {
  const { reviews, products, updateReviewStatus, deleteReview } = useApp();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredReviews = reviews.filter(review => {
    const product = products.find(p => p.id === review.productId);
    const productName = product?.name || '';
    const matchesSearch = 
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (reviewId: string) => {
    updateReviewStatus(reviewId, 'approved');
    toast({
      title: "Avis approuvé",
      description: "L'avis est maintenant visible sur la fiche produit",
    });
  };

  const handleReject = (reviewId: string) => {
    updateReviewStatus(reviewId, 'rejected');
    toast({
      title: "Avis rejeté",
      description: "L'avis ne sera pas visible publiquement",
    });
  };

  const handleDelete = (reviewId: string) => {
    deleteReview(reviewId);
    toast({
      title: "Avis supprimé",
      description: "L'avis a été supprimé définitivement",
    });
  };

  const getStatusColor = (status: Review['status']) => {
    switch (status) {
      case 'pending': return 'default';
      case 'approved': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: Review['status']) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'approved': return 'Approuvé';
      case 'rejected': return 'Rejeté';
      default: return status;
    }
  };

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-3xl font-bold tracking-tight">Avis clients</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Gérez les avis laissés par vos clients
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approuvés</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejetés</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des avis</CardTitle>
          <CardDescription>
            Filtrez et gérez tous les avis clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher par nom, produit ou commentaire..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="approved">Approuvés</SelectItem>
                <SelectItem value="rejected">Rejetés</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile: Cards */}
          <div className="sm:hidden space-y-3">
            {filteredReviews.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Aucun avis trouvé</p>
            ) : (
              filteredReviews.map((review) => {
                const product = products.find(p => p.id === review.productId);
                return (
                  <Card key={review.id} className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm truncate">{review.customerName}</span>
                          {review.verified && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">Vérifié</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{product?.name || 'Produit supprimé'}</p>
                      </div>
                      <Badge variant={getStatusColor(review.status)} className="text-[10px] shrink-0">
                        {getStatusLabel(review.status)}
                      </Badge>
                    </div>
                    <div className="flex gap-0.5 my-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`h-3.5 w-3.5 ${star <= review.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{review.comment}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                      <div className="flex gap-1">
                        {review.status !== 'approved' && (
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleApprove(review.id)}>
                            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                          </Button>
                        )}
                        {review.status !== 'rejected' && (
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleReject(review.id)}>
                            <XCircle className="h-3.5 w-3.5 text-orange-500" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(review.id)}>
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>

          {/* Desktop: Table */}
          <div className="hidden sm:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Commentaire</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      Aucun avis trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReviews.map((review) => {
                    const product = products.find(p => p.id === review.productId);
                    return (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">
                          {review.customerName}
                          {review.verified && (
                            <Badge variant="outline" className="ml-2 text-xs">Vérifié</Badge>
                          )}
                        </TableCell>
                        <TableCell>{product?.name || 'Produit supprimé'}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`h-4 w-4 ${star <= review.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                        <TableCell>{new Date(review.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(review.status)}>{getStatusLabel(review.status)}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {review.status !== 'approved' && (
                              <Button variant="ghost" size="icon" onClick={() => handleApprove(review.id)} title="Approuver">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                            )}
                            {review.status !== 'rejected' && (
                              <Button variant="ghost" size="icon" onClick={() => handleReject(review.id)} title="Rejeter">
                                <XCircle className="h-4 w-4 text-orange-500" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(review.id)} title="Supprimer">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reviews;

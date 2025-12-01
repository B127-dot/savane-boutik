import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Search, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/contexts/AppContext';
import { ImageUploader } from '@/components/ImageUploader';

const Products = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useApp();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    categoryId: '',
    stock: 0,
    status: 'active' as 'active' | 'inactive',
    images: [] as string[]
  });

  const filteredProducts = products.filter(product => {
    const category = categories.find(c => c.id === product.categoryId);
    return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category?.name.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      toast({
        title: "Produit modifié",
        description: "Le produit a été mis à jour avec succès",
      });
      setEditingProduct(null);
    } else {
      addProduct(formData);
      toast({
        title: "Produit ajouté",
        description: "Le nouveau produit a été créé avec succès",
      });
      setIsAddOpen(false);
    }
    
    setFormData({
      name: '',
      description: '',
      price: 0,
      categoryId: '',
      stock: 0,
      status: 'active',
      images: []
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      stock: product.stock,
      status: product.status,
      images: product.images || []
    });
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast({
      title: "Produit supprimé",
      description: "Le produit a été supprimé avec succès",
    });
  };

  const ProductForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom du produit</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoryId">Catégorie</Label>
          <Select
            value={formData.categoryId}
            onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Prix (€)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select
            value={formData.status}
            onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ImageUploader
        images={formData.images}
        onChange={(images) => setFormData({ ...formData, images })}
      />
      
      <DialogFooter>
        <Button type="submit">
          {editingProduct ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogFooter>
    </form>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Gestion des Produits</h1>
          <p className="font-body text-muted-foreground">
            Gérez votre catalogue de produits
          </p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau produit</DialogTitle>
              <DialogDescription>
                Remplissez les informations du produit
              </DialogDescription>
            </DialogHeader>
            <ProductForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher des produits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <div className="aspect-square bg-muted relative overflow-hidden">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              {product.images && product.images.length > 1 && (
                <Badge className="absolute top-2 right-2 bg-background/80">
                  +{product.images.length - 1}
                </Badge>
              )}
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>
                    {categories.find(c => c.id === product.categoryId)?.name || 'Sans catégorie'}
                  </CardDescription>
                </div>
                <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                  {product.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  {product.price.toLocaleString('fr-FR')} FCFA
                </span>
                <div className="flex items-center gap-2">
                  {product.stock === 0 ? (
                    <Badge variant="destructive" className="text-xs">
                      Rupture
                    </Badge>
                  ) : product.stock <= 5 ? (
                    <Badge variant="secondary" className="text-xs bg-warning/20 text-warning">
                      Stock faible: {product.stock}
                    </Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Stock: {product.stock}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex space-x-2">
              <Dialog open={editingProduct?.id === product.id} onOpenChange={(open) => !open && setEditingProduct(null)}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Modifier le produit</DialogTitle>
                    <DialogDescription>
                      Modifiez les informations du produit
                    </DialogDescription>
                  </DialogHeader>
                  <ProductForm />
                </DialogContent>
              </Dialog>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(product.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
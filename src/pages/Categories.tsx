import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, FolderOpen, Package, TrendingUp, Layers, AlertTriangle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import type { Category } from '@/contexts/AppContext';

const Categories = () => {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useApp();
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  // Calculate stats
  const getProductCountByCategory = (categoryId: string) => {
    return products.filter(p => p.categoryId === categoryId).length;
  };

  const totalProducts = products.length;
  const categoriesWithProducts = categories.filter(c => getProductCountByCategory(c.name) > 0).length;
  const avgProductsPerCategory = categories.length > 0 ? Math.round(totalProducts / categories.length) : 0;

  // Filter categories
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
      toast({
        title: "Catégorie modifiée",
        description: "La catégorie a été mise à jour avec succès",
      });
      setEditingCategory(null);
    } else {
      addCategory(formData);
      toast({
        title: "Catégorie ajoutée",
        description: "La nouvelle catégorie a été créée avec succès",
      });
      setIsAddOpen(false);
    }
    
    setFormData({ name: '', description: '' });
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description
    });
  };

  const handleDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id);
      toast({
        title: "Catégorie supprimée",
        description: "La catégorie a été supprimée avec succès",
      });
      setCategoryToDelete(null);
    }
  };

  const stats = [
    {
      title: "Total Catégories",
      value: categories.length,
      icon: Layers,
      color: "from-primary/20 to-primary/5",
      iconColor: "text-primary"
    },
    {
      title: "Catégories Actives",
      value: categoriesWithProducts,
      icon: FolderOpen,
      color: "from-emerald-500/20 to-emerald-500/5",
      iconColor: "text-emerald-500"
    },
    {
      title: "Total Produits",
      value: totalProducts,
      icon: Package,
      color: "from-blue-500/20 to-blue-500/5",
      iconColor: "text-blue-500"
    },
    {
      title: "Moy. Produits/Cat.",
      value: avgProductsPerCategory,
      icon: TrendingUp,
      color: "from-amber-500/20 to-amber-500/5",
      iconColor: "text-amber-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Catégories</h1>
          <p className="text-muted-foreground">Organisez vos produits par catégories</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter une catégorie
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle catégorie</DialogTitle>
              <DialogDescription>
                Créez une nouvelle catégorie pour organiser vos produits
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom de la catégorie</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Vêtements, Chaussures..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description de la catégorie"
                  />
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden border-border/50 hover:border-border transition-colors">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-50`} />
              <CardContent className="relative p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-background/80 ${stat.iconColor}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher une catégorie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Aucune catégorie</h3>
            <p className="text-muted-foreground text-sm text-center max-w-sm">
              {searchQuery ? "Aucune catégorie ne correspond à votre recherche" : "Créez votre première catégorie pour organiser vos produits"}
            </p>
            {!searchQuery && (
              <Button className="mt-4 gap-2" onClick={() => setIsAddOpen(true)}>
                <Plus className="w-4 h-4" />
                Créer une catégorie
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category, index) => {
            const productCount = getProductCountByCategory(category.id);
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group relative overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <FolderOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold">{category.name}</CardTitle>
                          <CardDescription className="line-clamp-2 mt-1">
                            {category.description || "Aucune description"}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {productCount} {productCount > 1 ? 'produits' : 'produit'}
                        </span>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setCategoryToDelete(category)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la catégorie</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la catégorie
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nom de la catégorie</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setEditingCategory(null)}>
                Annuler
              </Button>
              <Button type="submit">Sauvegarder</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!categoryToDelete} onOpenChange={() => setCategoryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-destructive/10">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <AlertDialogTitle>Supprimer la catégorie</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pt-2">
              Êtes-vous sûr de vouloir supprimer la catégorie "{categoryToDelete?.name}" ? 
              Cette action est irréversible. Les produits associés ne seront pas supprimés mais n'auront plus de catégorie.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Categories;
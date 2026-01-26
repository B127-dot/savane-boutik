import { useNavigate } from 'react-router-dom';
import { Category, Product } from '@/contexts/AppContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { slugify } from '@/lib/utils';

interface CategoryShowcaseProps {
  categories: Category[];
  products: Product[];
  shopUrl: string;
  onCategoryClick?: (categoryName: string) => void;
}

const CategoryShowcase = ({ categories, products, shopUrl, onCategoryClick }: CategoryShowcaseProps) => {
  const navigate = useNavigate();

  const getProductCountByCategory = (categoryId: string) => {
    return products.filter(p => p.categoryId === categoryId && p.status === 'active').length;
  };

  const getCategoryImage = (categoryId: string) => {
    const categoryProducts = products.filter(p => p.categoryId === categoryId && p.status === 'active');
    return categoryProducts[0]?.images[0] || '/placeholder.svg';
  };

  const handleCategoryClick = (category: Category) => {
    const slug = slugify(category.name);
    navigate(`/shop/${shopUrl}/category/${slug}`);
    onCategoryClick?.(category.name);
  };

  if (categories.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Parcourir par Catégorie
          </h2>
          <p className="text-lg font-body text-muted-foreground">
            Explorez nos collections organisées pour vous
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const productCount = getProductCountByCategory(category.id);
            if (productCount === 0) return null;

            return (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                onClick={() => handleCategoryClick(category)}
              >
                <AspectRatio ratio={4/3}>
                  <img 
                    src={getCategoryImage(category.id)}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="font-body text-white/90 mb-4">
                      {productCount} produit{productCount > 1 ? 's' : ''}
                    </p>
                    
                    {/* Button appears on hover */}
                    <Button
                      variant="secondary"
                      className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 w-fit"
                    >
                      Explorer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </AspectRatio>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;

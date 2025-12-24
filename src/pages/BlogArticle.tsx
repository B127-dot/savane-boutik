import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Copy,
  Check,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogCard from '@/components/blog/BlogCard';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Sample blog data (same as Blog.tsx - in production, this would come from an API)
const blogArticles = [
  {
    id: 1,
    title: "Comment augmenter vos ventes avec Orange Money et Mobile Money",
    excerpt: "Découvrez les meilleures pratiques pour intégrer les paiements mobiles dans votre boutique et maximiser vos conversions auprès des clients africains.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    category: "E-commerce",
    categoryId: "ecommerce",
    author: "Aminata Ouédraogo",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    date: "20 Décembre 2024",
    readTime: "5 min",
    slug: "augmenter-ventes-orange-money",
    featured: true,
    content: `
## Introduction

Le paiement mobile a révolutionné le commerce en Afrique de l'Ouest. Avec plus de 70% de la population utilisant Orange Money ou d'autres services de mobile money, ignorer ce mode de paiement serait une erreur stratégique majeure pour tout e-commerçant.

## Pourquoi le Mobile Money est essentiel

### 1. Accessibilité universelle

Contrairement aux cartes bancaires, le mobile money ne nécessite pas de compte bancaire traditionnel. Cela signifie que vous pouvez atteindre une clientèle beaucoup plus large, y compris les personnes non bancarisées qui représentent une part importante du marché africain.

### 2. Confiance des consommateurs

Les clients africains font confiance au mobile money. C'est un système qu'ils utilisent quotidiennement pour envoyer de l'argent à leur famille, payer leurs factures et faire des achats. En proposant ce mode de paiement, vous bénéficiez immédiatement de cette confiance établie.

### 3. Transactions instantanées

Les paiements sont confirmés en quelques secondes, ce qui vous permet de traiter les commandes rapidement et d'offrir une meilleure expérience client.

## Comment intégrer Orange Money dans votre boutique

### Étape 1 : Créez un compte marchand

Rendez-vous dans une agence Orange avec les documents suivants :
- Carte d'identité nationale
- Registre de commerce
- Numéro IFU

### Étape 2 : Configurez votre boutique BurkinaShop

Dans les paramètres de votre boutique, accédez à la section "Paiements" et activez Orange Money. Entrez votre numéro marchand et suivez les instructions.

### Étape 3 : Testez le processus

Effectuez quelques transactions tests pour vous assurer que tout fonctionne correctement avant de lancer officiellement.

## Conseils pour maximiser vos conversions

1. **Affichez clairement les options de paiement** : Mettez en évidence que vous acceptez Orange Money dès la page d'accueil.

2. **Proposez des promotions exclusives** : Offrez une réduction de 5% pour les paiements par mobile money.

3. **Simplifiez le processus** : Réduisez le nombre d'étapes nécessaires pour finaliser un achat.

4. **Envoyez des confirmations par SMS** : Les clients apprécient de recevoir une confirmation immédiate de leur paiement.

## Conclusion

L'intégration du mobile money n'est plus une option, c'est une nécessité pour réussir dans le e-commerce africain. En suivant ces conseils, vous pourrez augmenter significativement vos ventes et fidéliser votre clientèle.

Prêt à passer à l'action ? Créez votre boutique BurkinaShop dès aujourd'hui et commencez à accepter les paiements mobile money en quelques clics !
    `
  },
  {
    id: 2,
    title: "5 astuces pour optimiser votre boutique mobile",
    excerpt: "Le mobile représente 80% du trafic e-commerce en Afrique. Voici comment optimiser votre boutique pour convertir ces visiteurs en clients.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    category: "Tutoriels",
    categoryId: "tutoriels",
    author: "Ibrahim Koné",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "18 Décembre 2024",
    readTime: "7 min",
    slug: "optimiser-boutique-mobile",
    featured: false,
    content: `
## Le mobile, priorité absolue

En Afrique, plus de 80% des utilisateurs accèdent à internet via leur smartphone. Si votre boutique n'est pas optimisée pour le mobile, vous perdez potentiellement 8 clients sur 10.

## Astuce 1 : Optimisez la vitesse de chargement

Les connexions internet peuvent être lentes. Chaque seconde de chargement supplémentaire réduit vos conversions de 7%.

**Actions concrètes :**
- Compressez vos images
- Utilisez des formats modernes (WebP)
- Minimisez le nombre de requêtes

## Astuce 2 : Simplifiez la navigation

Sur un petit écran, chaque pixel compte. Votre navigation doit être intuitive et accessible en un seul pouce.

## Astuce 3 : Agrandissez les boutons

Les boutons d'action doivent faire au minimum 44x44 pixels pour être facilement cliquables.

## Astuce 4 : Réduisez les formulaires

Demandez uniquement les informations essentielles. Chaque champ supplémentaire est une friction potentielle.

## Astuce 5 : Testez sur de vrais appareils

Ne vous fiez pas uniquement aux émulateurs. Testez votre boutique sur différents smartphones Android populaires en Afrique.

## Conclusion

L'optimisation mobile n'est pas un luxe, c'est une nécessité. Appliquez ces astuces et observez vos conversions augmenter !
    `
  },
  {
    id: 3,
    title: "Success Story : Fatimata a triplé son chiffre d'affaires en 6 mois",
    excerpt: "Découvrez comment Fatimata, vendeuse de tissus traditionnels, a transformé son petit commerce local en une boutique en ligne prospère.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
    category: "Success Stories",
    categoryId: "success",
    author: "L'équipe BurkinaShop",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    date: "15 Décembre 2024",
    readTime: "4 min",
    slug: "success-story-fatimata",
    featured: false,
    content: `
## Le début de l'aventure

Fatimata Sawadogo, 34 ans, vendait des tissus traditionnels Faso Dan Fani sur le marché de Ouagadougou depuis 10 ans. Malgré la qualité de ses produits, elle peinait à développer son activité.

## La découverte de BurkinaShop

En mars 2024, une amie lui parle de BurkinaShop. Sceptique au début, Fatimata décide tout de même d'essayer la version gratuite.

## Les premiers résultats

Dès le premier mois, elle reçoit des commandes de Bobo-Dioulasso et même de Côte d'Ivoire. Des clients qu'elle n'aurait jamais pu atteindre depuis son étal du marché.

## La clé du succès

Fatimata attribue son succès à plusieurs facteurs :
- Des photos de qualité de ses tissus
- Des descriptions détaillées en français et en mooré
- Un service client réactif via WhatsApp
- L'acceptation d'Orange Money

## Aujourd'hui

Six mois plus tard, Fatimata a triplé son chiffre d'affaires. Elle emploie désormais deux couturières et envisage d'ouvrir un atelier de confection.

> "BurkinaShop a changé ma vie. Je peux maintenant vendre mes tissus dans tout le Burkina et même à l'étranger, depuis mon téléphone."

## Votre tour

L'histoire de Fatimata prouve qu'avec les bons outils, tout est possible. Créez votre boutique aujourd'hui et écrivez votre propre success story !
    `
  },
  {
    id: 4,
    title: "Guide complet : Vendre sur WhatsApp Business",
    excerpt: "WhatsApp est l'application la plus utilisée en Afrique. Apprenez à l'utiliser efficacement pour développer votre activité commerciale.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
    category: "Tutoriels",
    categoryId: "tutoriels",
    author: "Ousmane Diallo",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    date: "12 Décembre 2024",
    readTime: "10 min",
    slug: "guide-whatsapp-business",
    featured: false,
    content: `
## Pourquoi WhatsApp Business ?

Avec plus de 2 milliards d'utilisateurs dans le monde, WhatsApp est incontournable. En Afrique, c'est souvent l'application la plus utilisée après les SMS.

## Configuration de votre profil

### Informations essentielles
- Nom de votre entreprise
- Photo de profil professionnelle
- Description courte et accrocheuse
- Horaires d'ouverture
- Adresse et site web

### Le catalogue produits

WhatsApp Business vous permet de créer un catalogue de vos produits directement dans l'application.

## Automatisation des réponses

### Message d'accueil
Configurez un message automatique pour accueillir les nouveaux clients.

### Réponses rapides
Préparez des réponses types pour les questions fréquentes.

## Intégration avec BurkinaShop

BurkinaShop génère automatiquement un lien WhatsApp pour chaque commande, facilitant la communication avec vos clients.

## Bonnes pratiques

1. Répondez rapidement (moins de 2 heures)
2. Utilisez un ton professionnel mais chaleureux
3. Envoyez des photos de qualité
4. Confirmez toujours les commandes par écrit

## Conclusion

WhatsApp Business est un outil puissant et gratuit. Combiné à votre boutique BurkinaShop, il devient redoutable pour développer vos ventes.
    `
  },
  {
    id: 5,
    title: "Les tendances e-commerce au Burkina Faso en 2025",
    excerpt: "Quelles sont les grandes tendances qui vont façonner le commerce en ligne au Burkina Faso cette année ? Notre analyse complète.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "E-commerce",
    categoryId: "ecommerce",
    author: "Moussa Traoré",
    authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    date: "10 Décembre 2024",
    readTime: "8 min",
    slug: "tendances-ecommerce-2025",
    featured: false,
    content: `
## L'essor du commerce social

Les réseaux sociaux deviennent des plateformes de vente à part entière. Facebook, Instagram et TikTok intègrent de plus en plus de fonctionnalités shopping.

## Le mobile money comme standard

En 2025, ne pas accepter le mobile money sera aussi impensable que de ne pas accepter les espèces il y a 10 ans.

## La livraison express

Les clients veulent leurs produits rapidement. Les services de livraison en 24h se développent dans les grandes villes.

## Le contenu vidéo

Les vidéos de produits convertissent 80% de plus que les images statiques. TikTok et les Reels Instagram deviennent incontournables.

## L'intelligence artificielle

Les chatbots et l'IA permettent d'offrir un service client 24/7 sans coût supplémentaire.

## Conclusion

2025 s'annonce comme une année charnière pour le e-commerce africain. Ceux qui sauront s'adapter à ces tendances prendront une longueur d'avance.
    `
  },
  {
    id: 6,
    title: "Comment créer des publicités Facebook efficaces avec un petit budget",
    excerpt: "Vous n'avez pas besoin d'un gros budget pour faire de la publicité efficace. Voici nos conseils pour maximiser votre ROI.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop",
    category: "Marketing",
    categoryId: "marketing",
    author: "Aïcha Sawadogo",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    date: "8 Décembre 2024",
    readTime: "6 min",
    slug: "publicites-facebook-petit-budget",
    featured: false,
    content: `
## Commencez petit, pensez grand

Vous n'avez pas besoin de milliers de francs CFA pour commencer. Avec 5000 FCFA par jour, vous pouvez toucher des centaines de personnes ciblées.

## Définissez votre audience

Le ciblage est la clé. Soyez précis sur qui vous voulez atteindre : âge, localisation, centres d'intérêt.

## Créez des visuels accrocheurs

Une bonne image vaut mille mots. Investissez du temps dans vos visuels, ils font la différence.

## Testez, mesurez, optimisez

Ne mettez jamais tout votre budget sur une seule publicité. Testez plusieurs versions et gardez celle qui fonctionne le mieux.

## Utilisez le retargeting

Ciblez les personnes qui ont déjà visité votre boutique. Elles sont plus susceptibles d'acheter.

## Conclusion

La publicité Facebook est accessible à tous les budgets. Avec de la méthode et de la persévérance, vous pouvez obtenir d'excellents résultats.
    `
  },
];

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  // Find the current article
  const article = blogArticles.find(a => a.slug === slug);

  // Get related articles (same category, excluding current)
  const relatedArticles = article 
    ? blogArticles
        .filter(a => a.categoryId === article.categoryId && a.id !== article.id)
        .slice(0, 3)
    : [];

  // If not enough related articles, fill with other articles
  const displayRelated = relatedArticles.length >= 2 
    ? relatedArticles 
    : [...relatedArticles, ...blogArticles.filter(a => a.id !== article?.id && !relatedArticles.includes(a))].slice(0, 3);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = article?.title || '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success('Lien copié !');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <Button asChild>
            <Link to="/blog">Retour au blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Article Content */}
      <article className="relative -mt-32 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {/* Back Button */}
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>

            {/* Article Header */}
            <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-3xl p-8 sm:p-12 mb-8">
              {/* Category */}
              <Badge className="mb-4 bg-primary/10 text-primary border border-primary/20">
                {article.category}
              </Badge>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
                <div className="flex items-center gap-3">
                  <img 
                    src={article.authorAvatar} 
                    alt={article.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{article.author}</span>
                </div>
                <span className="text-border">•</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <span className="text-border">•</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} de lecture</span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-border/50">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Partager :
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
                    onClick={() => handleShare('facebook')}
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]"
                    onClick={() => handleShare('twitter')}
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
                    onClick={() => handleShare('linkedin')}
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
                    onClick={() => handleShare('whatsapp')}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={handleCopyLink}
                  >
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 sm:p-12">
              <div 
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-display prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-li:text-muted-foreground
                  prose-strong:text-foreground
                  prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                  prose-a:text-primary hover:prose-a:underline
                "
              >
                {article.content.split('\n').map((line, index) => {
                  if (line.startsWith('## ')) {
                    return <h2 key={index}>{line.replace('## ', '')}</h2>;
                  } else if (line.startsWith('### ')) {
                    return <h3 key={index}>{line.replace('### ', '')}</h3>;
                  } else if (line.startsWith('> ')) {
                    return <blockquote key={index}>{line.replace('> ', '')}</blockquote>;
                  } else if (line.startsWith('- ')) {
                    return <li key={index}>{line.replace('- ', '')}</li>;
                  } else if (line.match(/^\d+\. /)) {
                    return <li key={index}>{line.replace(/^\d+\. /, '')}</li>;
                  } else if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={index}><strong>{line.replace(/\*\*/g, '')}</strong></p>;
                  } else if (line.trim()) {
                    return <p key={index}>{line}</p>;
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Author Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 mt-8 flex items-center gap-4"
            >
              <img 
                src={article.authorAvatar} 
                alt={article.author}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Écrit par</p>
                <p className="font-display font-bold text-lg">{article.author}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              Articles{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                similaires
              </span>
            </h2>
            <p className="text-muted-foreground">
              Continuez votre lecture avec ces articles
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {displayRelated.map((relatedArticle, index) => (
              <BlogCard 
                key={relatedArticle.id}
                {...relatedArticle}
                index={index}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/blog" className="gap-2">
                Voir tous les articles
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <BlogNewsletter />

      <Footer />
    </div>
  );
};

export default BlogArticle;

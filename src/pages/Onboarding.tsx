import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Check, Store, Package, MessageCircle, Share2, ArrowRight, ArrowLeft } from "lucide-react";
import { isValidWhatsAppNumber, formatWhatsAppNumber } from "@/lib/whatsapp";

const Onboarding = () => {
  const { user, shopSettings, updateShopSettings, addProduct } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Step 1: Shop Configuration
  const [shopName, setShopName] = useState(shopSettings?.shopName || "");
  const [shopDescription, setShopDescription] = useState(shopSettings?.description || "");
  const [shopPhone, setShopPhone] = useState(shopSettings?.phone || "");
  const [shopAddress, setShopAddress] = useState(shopSettings?.address || "");

  // Step 2: First Product
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productDescription, setProductDescription] = useState("");

  // Step 3: WhatsApp
  const [whatsappNumber, setWhatsappNumber] = useState(shopSettings?.socialLinks?.whatsapp || "");

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!shopName.trim() || !shopDescription.trim()) {
        toast({
          title: "Informations incomplètes",
          description: "Veuillez remplir au moins le nom et la description de votre boutique",
          variant: "destructive",
        });
        return;
      }

      updateShopSettings({
        shopName,
        description: shopDescription,
        phone: shopPhone,
        address: shopAddress,
        shopUrl: shopName.toLowerCase().replace(/\s+/g, '-'),
      });

      toast({
        title: "Boutique configurée !",
        description: "Passons maintenant à votre premier produit",
      });
    }

    if (currentStep === 2) {
      if (!productName.trim() || !productPrice || !productStock) {
        toast({
          title: "Informations incomplètes",
          description: "Veuillez remplir au moins le nom, prix et stock du produit",
          variant: "destructive",
        });
        return;
      }

      addProduct({
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
        stock: parseInt(productStock),
        images: ['/placeholder.svg'],
        categoryId: '1', // Default category
        status: 'active',
      });

      toast({
        title: "Produit ajouté !",
        description: "Excellent ! Configurons maintenant WhatsApp",
      });
    }

    if (currentStep === 3) {
      if (whatsappNumber && !isValidWhatsAppNumber(whatsappNumber)) {
        toast({
          title: "Numéro invalide",
          description: "Format attendu : +226 70 12 34 56 ou 22670123456",
          variant: "destructive",
        });
        return;
      }

      if (whatsappNumber) {
        updateShopSettings({
          socialLinks: {
            ...shopSettings?.socialLinks,
            whatsapp: formatWhatsAppNumber(whatsappNumber),
          },
        });

        toast({
          title: "WhatsApp configuré !",
          description: "Vos clients pourront commander via WhatsApp",
        });
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkipStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFinish = () => {
    toast({
      title: "Félicitations ! 🎉",
      description: "Votre boutique est prête à vendre",
    });
    navigate('/dashboard');
  };

  const steps = [
    {
      number: 1,
      title: "Configurez votre boutique",
      description: "Informations essentielles de votre boutique",
      icon: Store,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shopName">Nom de la boutique *</Label>
            <Input
              id="shopName"
              placeholder="Ma Belle Boutique"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shopDescription">Description *</Label>
            <Textarea
              id="shopDescription"
              placeholder="Décrivez votre boutique en quelques mots..."
              value={shopDescription}
              onChange={(e) => setShopDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shopPhone">Téléphone</Label>
            <Input
              id="shopPhone"
              type="tel"
              placeholder="+226 70 12 34 56"
              value={shopPhone}
              onChange={(e) => setShopPhone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shopAddress">Adresse</Label>
            <Input
              id="shopAddress"
              placeholder="Ouagadougou, Burkina Faso"
              value={shopAddress}
              onChange={(e) => setShopAddress(e.target.value)}
            />
          </div>
        </div>
      ),
    },
    {
      number: 2,
      title: "Ajoutez votre premier produit",
      description: "Commencez à construire votre catalogue",
      icon: Package,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productName">Nom du produit *</Label>
            <Input
              id="productName"
              placeholder="Ex: Smartphone Samsung Galaxy"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productPrice">Prix (FCFA) *</Label>
              <Input
                id="productPrice"
                type="number"
                placeholder="50000"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productStock">Stock *</Label>
              <Input
                id="productStock"
                type="number"
                placeholder="10"
                value={productStock}
                onChange={(e) => setProductStock(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productDescription">Description</Label>
            <Textarea
              id="productDescription"
              placeholder="Décrivez votre produit..."
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={3}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            💡 Vous pourrez ajouter des images et plus de détails depuis le tableau de bord
          </p>
        </div>
      ),
    },
    {
      number: 3,
      title: "Configurez WhatsApp Business",
      description: "Permettez à vos clients de commander via WhatsApp",
      icon: MessageCircle,
      content: (
        <div className="space-y-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Pourquoi WhatsApp ?
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✅ Canal de communication préféré au Burkina Faso</li>
              <li>✅ Vos clients peuvent commander en 1 clic</li>
              <li>✅ Messages automatiques formatés professionnellement</li>
              <li>✅ Augmente vos taux de conversion</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">Numéro WhatsApp Business</Label>
            <Input
              id="whatsappNumber"
              type="tel"
              placeholder="+226 70 12 34 56"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Format accepté : +226 70 12 34 56 ou 22670123456
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-foreground">💡 Conseil</p>
            <p className="text-sm text-muted-foreground">
              Utilisez un numéro WhatsApp Business pour une meilleure gestion des commandes.
              C'est gratuit et facile à configurer !
            </p>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Vous pouvez passer cette étape et la configurer plus tard dans les paramètres
          </p>
        </div>
      ),
    },
    {
      number: 4,
      title: "Partagez votre boutique",
      description: "Votre boutique est prête à recevoir des clients !",
      icon: Share2,
      content: (
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Félicitations ! 🎉</h3>
            <p className="text-muted-foreground">
              Votre boutique en ligne est maintenant configurée et prête à vendre
            </p>
          </div>

          <div className="bg-gradient-card border border-primary/20 rounded-lg p-6 space-y-4">
            <h4 className="font-semibold text-foreground">Votre lien de boutique</h4>
            <div className="flex items-center gap-2">
              <Input
                value={`burkinashop.com/shop/${shopSettings?.shopUrl || 'ma-boutique'}`}
                readOnly
                className="bg-background"
              />
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/shop/${shopSettings?.shopUrl || 'ma-boutique'}`);
                  toast({
                    title: "Lien copié !",
                    description: "Partagez-le sur vos réseaux sociaux",
                  });
                }}
              >
                Copier
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Prochaines étapes recommandées :</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary font-bold">1</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Ajoutez plus de produits à votre catalogue
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary font-bold">2</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Partagez votre boutique sur Facebook, Instagram, WhatsApp
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary font-bold">3</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Créez des codes promo pour attirer vos premiers clients
                </span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Bienvenue sur BurkE-Shop
          </h1>
          <p className="text-muted-foreground">
            Configurons votre boutique en quelques minutes
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Étape {currentStep} sur {totalSteps}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <div
                key={step.number}
                className="flex flex-col items-center gap-2 flex-1"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? 'bg-primary border-primary text-primary-foreground'
                      : isCurrent
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-background text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <StepIcon className="w-6 h-6" />
                  )}
                </div>
                <span
                  className={`text-xs text-center hidden md:block ${
                    isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <Card className="border-primary/20 shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {React.createElement(currentStepData.icon, {
                className: "w-6 h-6 text-primary",
              })}
              {currentStepData.title}
            </CardTitle>
            <CardDescription>{currentStepData.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStepData.content}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>

              <div className="flex items-center gap-2">
                {currentStep < totalSteps && currentStep !== 1 && (
                  <Button variant="ghost" onClick={handleSkipStep}>
                    Passer
                  </Button>
                )}

                {currentStep < totalSteps ? (
                  <Button onClick={handleNextStep}>
                    Suivant
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleFinish} variant="hero">
                    Accéder au tableau de bord
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
